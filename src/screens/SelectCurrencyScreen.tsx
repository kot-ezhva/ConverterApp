import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParams } from '@navigation/MainStackNavigator';
import ROUTES from '@utils/Routes';
import { useTheme } from '@react-navigation/native';
import { Currency } from '@utils/Types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORED_CURRENCIES_RATES_KEY } from '@utils/Constants';
import { Input } from '@components';
import commonStyles, { CONTAINER_PADDING } from '@assets/commonStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import { useConverter } from '@utils/ConverterContext';
import Colors from '@utils/themes/Colors';

type Props = NativeStackScreenProps<MainStackParams, ROUTES.SelectCurrency>;

const SelectCurrencyScreen = ({ navigation, route }: Props) => {
  const { isFrom } = route.params;

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [searchText, setSearchText] = useState('');
  const { colors } = useTheme();
  const { bottom: bottomSafeOffset } = useSafeAreaInsets();

  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency } = useConverter();

  const selectedValue = useMemo(() => {
    return isFrom ? fromCurrency : toCurrency;
  }, [fromCurrency, isFrom, toCurrency]);

  const currenciesData = useMemo(() => {
    return currencies.filter(item =>
      (item.code + item.name).trim().toLowerCase().includes(searchText.trim().toLowerCase()),
    );
  }, [currencies, searchText]);

  useEffect(() => {
    (async () => {
      const rates = (await AsyncStorage.getItem(STORED_CURRENCIES_RATES_KEY)) || '';
      setCurrencies(JSON.parse(rates));
    })();
  }, []);

  const onPress = (currency: Currency) => {
    const newValue = currency.code === selectedValue?.code ? null : currency;
    isFrom ? setFromCurrency(newValue) : setToCurrency(newValue);
    navigation.goBack();
  };

  const _renderItem = ({ item }: { item: Currency }) => {
    const isSelected = item.code === selectedValue?.code;

    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        style={[styles.listItem, { backgroundColor: isSelected ? colors.border : colors.notification }]}
      >
        <FastImage source={{ uri: item.flagSrc }} style={styles.flag} />
        <Text style={[styles.text, { color: colors.text }]} numberOfLines={1}>{`${item.code} - ${item.name}`}</Text>

        <View style={[styles.checkbox, { borderColor: colors.text }]}>
          {isSelected && <View style={[styles.checkboxDot, { backgroundColor: colors.text }]} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingBottom: styles.container.padding + bottomSafeOffset }]}>
      <Input value={searchText} onChangeText={setSearchText} placeholder="Search" containerStyle={styles.input} />

      <FlatList
        style={[styles.list, { backgroundColor: colors.notification }]}
        data={currenciesData}
        keyExtractor={item => `key_${item.code}`}
        renderItem={_renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flex,
    padding: CONTAINER_PADDING,
  },
  input: {
    marginBottom: 16,
  },
  list: {
    borderRadius: 8,
  },
  listItem: {
    ...commonStyles.flexRow,
    padding: 16,
    alignItems: 'center',
  },
  flag: {
    width: 30,
    height: 20,
    borderWidth: 1,
    borderRadius: 4,
    marginRight: 8,
  },
  text: {
    ...commonStyles.flex,
    fontSize: 16,
  },
  checkbox: {
    ...commonStyles.center,
    marginLeft: 8,
    borderWidth: 1,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  checkboxDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.black,
  },
});

export default SelectCurrencyScreen;
