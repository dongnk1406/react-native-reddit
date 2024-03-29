import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {privateRoutes} from '../config/routes';
const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      {privateRoutes.map((route, index) => {
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

export default AppStack;
