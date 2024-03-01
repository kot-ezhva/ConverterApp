import React from 'react';
import { View, Text, StyleSheet, TextInputProps, TextInput, StyleProp, ViewStyle } from 'react-native';
import { Colors } from '@utils/themes';
import { useTheme } from '@react-navigation/native';

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = ({ label = '', containerStyle = {}, ...props }: Props) => {
  const { colors } = useTheme();

  return (
    <View style={containerStyle}>
      {!!label?.length && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
      <TextInput style={[styles.input, { backgroundColor: colors.card, color: colors.text }]} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
});

export default Input;
