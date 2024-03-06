import React from 'react';
import { View, Text, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { CONTAINER_PADDING } from '@assets/commonStyles.tsx';
import Colors from '@utils/themes/Colors';
import { useTheme } from '@react-navigation/native';

type Account = {
  login: string;
  name: string;
  type: string;
  balanceInUsd: number;
};

const ACCOUNTS: Account[] = [
  { login: '1822880', name: 'AccountMaYSW', type: 'Standard', balanceInUsd: 6217.57 },
  { login: '1347980', name: 'AccountqmWCD', type: 'Pro', balanceInUsd: 1241.66 },
  { login: '1926969', name: 'AccountuEPlu', type: 'Pro', balanceInUsd: 3235.97 },
  { login: '1875057', name: 'AccountLCMJK', type: 'Standard', balanceInUsd: 2439.67 },
  { login: '1420085', name: 'AccountxOPmE', type: 'Cent', balanceInUsd: 979.32 },
  { login: '1962952', name: 'AccountxDFDw', type: 'Cent', balanceInUsd: 2320.15 },
  { login: '1199128', name: 'AccountdVNme', type: 'Standard', balanceInUsd: 8489.59 },
];

const AccountSwiper = () => {
  const { width: deviceWidth } = useWindowDimensions();
  const { colors: themeColors } = useTheme();

  const itemWidth = deviceWidth - CONTAINER_PADDING * 2;

  const _renderItem = ({ item }: { item: Account }) => (
    <View style={[styles.item, { width: itemWidth, backgroundColor: themeColors.card }]}>
      <View style={[styles.row, { marginBottom: CONTAINER_PADDING }]}>
        <Text style={[styles.login, { color: themeColors.text }]}>{item.login}</Text>
        <Text style={[styles.type, { backgroundColor: themeColors.primary, color: Colors.white }]}>{item.type}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.name, { color: themeColors.text }]}>{item.name}</Text>
        <Text style={[styles.balanceInUsd, { color: themeColors.text }]}>{`$ ${item.balanceInUsd}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrap}>
      <FlatList
        contentContainerStyle={styles.container}
        data={ACCOUNTS}
        keyExtractor={(_, index) => `key_${index}`}
        renderItem={_renderItem}
        horizontal
        snapToInterval={itemWidth + CONTAINER_PADDING}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View style={{ width: CONTAINER_PADDING }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: -CONTAINER_PADDING,
    marginBottom: CONTAINER_PADDING,
  },
  container: {
    paddingHorizontal: CONTAINER_PADDING,
  },
  item: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: CONTAINER_PADDING,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  login: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  type: {
    fontSize: 14,
    backgroundColor: '#DEF5EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: 'hidden',
  },
  name: {},
  balanceInUsd: {
    fontWeight: '500',
  },
});

export default AccountSwiper;
