import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { MainStackNavigator } from '@navigation';
import { DarkTheme, LightTheme } from '@utils/themes';
import { Splash } from '@screens';
import Api from '@utils/Api';
import { showError } from '@utils/Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORED_CURRENCIES_RATES_KEY } from '@utils/Constants';
import supportedCurrencies from '@assets/supported_currencies.json';
import { Currency } from '@utils/Types';
import { ConverterProvider } from '@utils/ConverterContext';

const App = () => {
  const isDark = useColorScheme() === 'dark';
  const theme = isDark ? DarkTheme : LightTheme;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const savedRates = (await AsyncStorage.getItem(STORED_CURRENCIES_RATES_KEY)) || '';
    const rates: Currency[] = savedRates
      ? JSON.parse(savedRates)
      : supportedCurrencies.map(item => ({ ...item, rateToUSD: 0 }));

    await AsyncStorage.setItem(STORED_CURRENCIES_RATES_KEY, JSON.stringify(rates));

    // Update remote rate values
    try {
      const { rates: remoteRates } = await Api.getLatestCurrencyRatesUSDBased();
      if (Object.keys(remoteRates).length) {
        const newRates: Currency[] = rates.map(item => ({
          ...item,
          rateToUSD: remoteRates[item.code] || 0,
        }));

        await AsyncStorage.setItem(STORED_CURRENCIES_RATES_KEY, JSON.stringify(newRates));
      }
    } catch (e: any) {
      showError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Splash />;
  }

  return (
    <NavigationContainer theme={theme}>
      <ConverterProvider>
        <MainStackNavigator />
      </ConverterProvider>
    </NavigationContainer>
  );
};

export default App;
