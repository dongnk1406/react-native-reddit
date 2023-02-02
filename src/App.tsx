import React, {useRef} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import {ActivityIndicator, StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from 'src/navigation';
import RootStack from './navigation/scenes/RootStack';
import {config} from 'app-config';
import {store} from 'src/store';
import './util/i18n';

interface AppProps {}
let persistor = persistStore(store);

const App = ({}: AppProps) => {
  const routeNameRef = useRef();

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <NavigationContainer
              ref={navigationRef}
              fallback={<ActivityIndicator />}
              onReady={() => {
                routeNameRef.current =
                  navigationRef.current.getCurrentRoute().name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                  navigationRef.current.getCurrentRoute().name;
                if (previousRouteName !== currentRouteName) {
                  routeNameRef.current = currentRouteName;
                  // Your implementation of analytics goes here!
                }
              }}>
              <StatusBar
                backgroundColor={config.color.primary}
                barStyle="default"
              />
              <RootStack />
              <FlashMessage position="top" />
            </NavigationContainer>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
