import React from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {ActivityIndicator, StatusBar} from 'react-native';
import {navigationRef} from 'src/navigation';
import {store} from 'src/store';
import {config} from 'app-config';
import RootStack from './navigation/scenes/RootStack';
import FlashMessage from 'react-native-flash-message';

interface AppProps {}
let persistor = persistStore(store);

const App = ({}: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <NativeBaseProvider>
          <NavigationContainer ref={navigationRef}>
            <StatusBar
              backgroundColor={config.color.primary}
              barStyle="default"
            />
            <RootStack />
            <FlashMessage position="top" />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
