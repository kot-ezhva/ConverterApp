import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Dimensions, Keyboard, TouchableWithoutFeedback, Text, View, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '@navigation/MainStackNavigator';
import ROUTES from '@utils/Routes';
import { SafeAreaView } from 'react-native-safe-area-context';
import commonStyles, { CONTAINER_PADDING } from '@assets/commonStyles';
import { Input, SelectCurrencyButton } from '@components';
import { useConverter } from '@utils/ConverterContext';
import FastImage from 'react-native-fast-image';
import { useTheme } from '@react-navigation/native';

const arrows = require('@assets/icons/arrows-left-right.png');

const { height: deviceHeight } = Dimensions.get('window');

const regExp = new RegExp(/^-?\d*\.?\d*$/);

type Props = NativeStackScreenProps<MainStackParams, ROUTES.Home>;

const HomeScreen = ({ navigation }: Props) => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const { colors } = useTheme();

  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } = useConverter();

  const fullfiled = useMemo(() => fromCurrency && toCurrency && amount, [fromCurrency, toCurrency, amount]);

  useEffect(() => {
    if (fromCurrency && toCurrency && amount) {
      setResult(
        ((1 / fromCurrency.rateToUSD) * toCurrency.rateToUSD * Number(amount))
          .toFixed(toCurrency?.decimalDigits)
          .toString(),
      );
    } else {
      setResult('');
    }
  }, [fromCurrency, toCurrency, amount]);

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const setValidAmount = (text: string) => {
    const normalized = text.replace(',', '.').trim();
    if (regExp.test(normalized)) {
      setAmount(normalized);
    }
  };

  return (
    <TouchableWithoutFeedback style={commonStyles.flex} onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container]}>
        <View style={styles.buttonsContainer}>
          <SelectCurrencyButton
            currency={fromCurrency}
            onPress={() => navigation.navigate(ROUTES.SelectCurrency, { isFrom: true })}
          />
          <TouchableOpacity style={styles.swapBtn} onPress={swapCurrencies}>
            <FastImage source={arrows} style={styles.swapIcon} />
          </TouchableOpacity>
          <SelectCurrencyButton
            currency={toCurrency}
            onPress={() => navigation.navigate(ROUTES.SelectCurrency, { isFrom: false })}
          />
        </View>

        <Input
          label="Amount:"
          keyboardType="numeric"
          placeholder="Enter amount"
          inputMode="decimal"
          value={amount}
          onChangeText={setValidAmount}
        />

        <View style={styles.resultContainer}>
          {!!amount && fromCurrency && (
            <Text style={[styles.resultText, { color: colors.text }]}>{`${amount + fromCurrency.symbolNative} =`}</Text>
          )}
          {fullfiled && !!result.length && (
            <Text
              style={[styles.resultBigText, { color: colors.text }]}
            >{`${result} ${toCurrency?.symbolNative}`}</Text>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex,
    padding: CONTAINER_PADDING,
    paddingTop: deviceHeight / 4,
  },
  buttonsContainer: {
    ...commonStyles.flexRow,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  swapBtn: {
    padding: 12,
  },
  swapIcon: {
    width: 18,
    height: 18,
  },
  resultContainer: {
    paddingTop: 24,
  },
  resultText: {
    fontSize: 16,
  },
  resultBigText: {
    marginTop: 4,
    fontSize: 42,
  },
});

export default HomeScreen;
