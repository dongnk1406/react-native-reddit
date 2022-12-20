import React, {useEffect, useMemo, useReducer} from 'react';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeBaseProvider} from 'native-base';
import {StatusBar} from 'react-native';
import {AppStack, AuthStack} from 'src/navigation';
import {Launch} from 'src/containers';
import {store} from 'src/redux';
import {AuthContext} from './theme/context';
import {config} from 'app-config';

interface AppProps {}

let persistor = persistStore(store);

const App = ({}: AppProps) => {
  const initialLoginState = {
    isLoading: true,
    userPhone: '',
    userToken: '',
  };

  const loginReducer = (state: {}, action: () => {}) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...state,
          userPhone: action.phone,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          userPhone: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...state,
          userPhone: action.phone,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(
    () => ({
      signIn: async payload => {
        const userToken = String(payload[0].userToken);
        const userPhone = String(payload[0].userPhone);
        try {
          await AsyncStorage.setItem('user_token', userToken);
          dispatch({
            type: 'LOGIN',
            phone: userPhone,
            token: userToken,
          });
        } catch (error) {
          console.log(error);
        }
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('user_token');
          dispatch({type: 'LOGOUT'});
        } catch (error) {
          console.log(error);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const userToken = await AsyncStorage.getItem('user_token');
        dispatch({
          type: 'RESTORE_TOKEN',
          token: userToken,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAsyncStorage();

    return () => {};
  }, []);

  if (loginState.isLoading) {
    return <Launch />;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <AuthContext.Provider value={authContext}>
            <NavigationContainer>
              <StatusBar
                backgroundColor={config.color.primary}
                barStyle="default"
              />
              {loginState.userToken !== null ? <AppStack /> : <AuthStack />}
            </NavigationContainer>
          </AuthContext.Provider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
