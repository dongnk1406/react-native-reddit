import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {publicRoutes} from './routes';
import { StatusBar } from 'react-native';
import { config } from 'app-config';
const Stack = createNativeStackNavigator();

function AuthStack(props) {
  return (
    <Stack.Navigator>
      {publicRoutes.map((route, index) => {
        return (
          <Stack.Screen
            key={index}
            name={route.name}
            component={route.component}
            options={route.options}
          />
        );
      })}
    </Stack.Navigator>
  );
}

export default AuthStack;
