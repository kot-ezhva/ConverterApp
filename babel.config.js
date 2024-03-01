module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@root': './',
          '@assets': './src/assets',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@components': './src/components',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
