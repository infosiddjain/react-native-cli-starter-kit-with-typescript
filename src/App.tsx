import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Loader } from '@components/ui/Loader';
import { RootNavigator } from '@navigation/RootNavigator';
import { persistor, store } from '@store/index';

const App = () => (
  <GestureHandlerRootView style={styles.flex}>
    <Provider store={store}>
      {/* Waits until saved state (theme, auth) is loaded from AsyncStorage */}
      <PersistGate loading={<Loader />} persistor={persistor}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  flex: { flex: 1 },
});

export default App;
