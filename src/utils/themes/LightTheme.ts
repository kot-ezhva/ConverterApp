import { Theme } from '@react-navigation/native';
import Colors from './Colors';

const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: 'rgb(10, 132, 255)',
    background: '#F5F5F5',
    card: Colors.white,
    text: Colors.black,
    border: '#DEDEDE',
    notification: '#E7E7E7',
  },
};

export default LightTheme;
