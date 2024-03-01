import { Alert } from 'react-native';

export const showError = (message?: string) => {
  Alert.alert('Error', message);
};
