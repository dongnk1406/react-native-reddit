import React, {useEffect, useMemo, useReducer, memo} from 'react';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppStack, AuthStack} from 'src/navigation';
import {Launch} from 'src/containers';
import {AuthContext} from './src/theme/context';
import {NativeBaseProvider} from 'native-base';
import {StatusBar} from 'react-native';
import {config} from 'app-config';
import {store} from 'src/store';

interface AppProps {}

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
      <NativeBaseProvider>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <StatusBar backgroundColor={config.color.primary} />
            {loginState.userToken !== null ? <AppStack /> : <AuthStack />}
          </NavigationContainer>
        </AuthContext.Provider>
      </NativeBaseProvider>
    </Provider>
  );
};

export default memo(App);
