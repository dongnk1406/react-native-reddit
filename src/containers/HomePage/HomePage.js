import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Tabs} from 'src/navigation/TabNavigator';
import {config} from 'app-config';

const BottomTab = createBottomTabNavigator();

function HomePage({navigation}) {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: config.color.primary,
        tabBarHideOnKeyboard: true,
        tabBarBadgeStyle: {
          backgroundColor: config.color.notification,
          color: config.color.white,
          fontSize: 10,
          top: '15%',
          left: '15%',
        },
        tabBarStyle: {
          // borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          bottom: 3,
          fontSize: 10,
        },
      }}
      initialRouteName="Home">
      {Tabs.map((bottomTab, index) => {
        return (
          <BottomTab.Screen
            key={index}
            name={bottomTab.name}
            component={bottomTab.component}
            options={bottomTab.options}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}

export default HomePage;