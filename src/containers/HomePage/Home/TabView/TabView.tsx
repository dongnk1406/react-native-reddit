import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import News from '../News';
import Popular from '../Popular';
import {navigationStrings} from 'src/navigation';
import {config} from 'app-config';
import {TabViewProps} from '.';
const Tab = createMaterialTopTabNavigator();

function TabView({}: TabViewProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          marginVertical: -3,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          textTransform: 'capitalize',
        },

        tabBarIndicatorStyle: {
          width: '20%',
          left: '15%',
          backgroundColor: config.color.primary,
        },
      }}>
      <Tab.Screen name={navigationStrings.NEWS} component={News} />
      <Tab.Screen name={navigationStrings.POPULAR} component={Popular} />
    </Tab.Navigator>
  );
}

export default TabView;
