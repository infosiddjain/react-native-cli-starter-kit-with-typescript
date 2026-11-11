module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: [
    './node_modules/react-native-gesture-handler/jest-setup/index.js',
    './jest.setup.js',
  ],
  resolver: 'react-native-reanimated/jest/resolver',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-native-community|@react-navigation|@reduxjs|react-redux|redux-persist|immer))',
  ],
};
