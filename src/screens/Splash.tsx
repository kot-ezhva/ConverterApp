import React from 'react';
import { View, Text } from 'react-native';
import commonStyles from '@assets/commonStyles';
import { useTheme } from '@react-navigation/native';

const Splash = () => {
  const { colors } = useTheme();
  return (
    <View style={[commonStyles.flex, commonStyles.center, { backgroundColor: colors.background }]}>
      <Text style={{ color: colors.text }}>Loading...</Text>
    </View>
  );
};

export default Splash;
