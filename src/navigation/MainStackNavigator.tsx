import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, SelectCurrencyScreen } from '@screens';
import ROUTES from '@utils/Routes';

export type MainStackParams = {
  [ROUTES.Home]: undefined;
  [ROUTES.SelectCurrency]: {
    isFrom: boolean;
  };
};

const Stack = createNativeStackNavigator<MainStackParams>();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.Home}>
      <Stack.Screen name={ROUTES.Home} component={HomeScreen} options={{ headerShown: false }} />

      <Stack.Screen
        name={ROUTES.SelectCurrency}
        component={SelectCurrencyScreen}
        options={{
          gestureEnabled: true,
          title: 'Select currency',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
