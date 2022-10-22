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
        tabBarScrollEnabled: true,
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
        tabBarItemStyle: {
          width: 100,
        },
        tabBarIndicatorContainerStyle: {},
        tabBarIndicatorStyle: {
          backgroundColor: config.color.primary,
        },
      }}>
      <Tab.Screen name={navigationStrings.NEWS} component={News} />
      <Tab.Screen name={navigationStrings.POPULAR} component={Popular} />
    </Tab.Navigator>
  );
}

export default TabView;
