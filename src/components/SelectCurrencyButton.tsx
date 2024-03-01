import React from 'react';
import { StyleSheet, TouchableOpacity, ViewProps, View, Text, Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Currency } from '@utils/Types';
import FastImage from 'react-native-fast-image';
import commonStyles from '@assets/commonStyles';

const { width: deviceWidth } = Dimensions.get('window');

const chevronDown = require('@assets/icons/chevron-down.png');

export interface Props extends ViewProps {
  currency: Currency | null;
  onPress: () => void;
}

const SelectCurrencyButton = ({ currency, onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={[{ opacity: !currency ? 0.5 : 1 }]} activeOpacity={0.8} onPress={onPress}>
      <View style={[styles.container, { backgroundColor: colors.notification }]}>
        {currency && <FastImage style={styles.flag} source={{ uri: currency.flagSrc }} />}
        <Text style={[styles.text, { color: colors.text }]} numberOfLines={1}>
          {currency ? currency.code : 'Select currency'}
        </Text>
        <FastImage style={styles.chevron} source={chevronDown} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.flexRow,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: deviceWidth / 3,
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
  chevron: {
    height: 18,
    width: 18,
    marginLeft: 8,
  },
});

export default SelectCurrencyButton;
