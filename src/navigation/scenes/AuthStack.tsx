import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {publicRoutes} from '../config/routes';
const Stack = createNativeStackNavigator();

function AuthStack() {
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
