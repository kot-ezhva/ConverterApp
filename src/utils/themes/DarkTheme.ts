import { Theme } from '@react-navigation/native';
import Colors from './Colors';

const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: Colors.primary,
    background: Colors.borderDark,
    card: Colors.black,
    text: Colors.white,
    border: Colors.black,
    notification: '#1e1e1e',
  },
};

export default DarkTheme;
