import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Home, Post, Chat, Explore, Notification} from 'src/containers/HomePage';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {navigationStrings} from 'src/navigation';
import {config, isAndroidPlatform} from 'app-config';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const BottomTab = createBottomTabNavigator();

const lightHeaderStyle = {
  headerTitleStyle: {},
  headerTitleAlign: 'center',
  headerTintColor: config.color.white,
  headerStyle: {
    backgroundColor: config.color.primary,
  },
};

function TabStacks() {
  const Tabs = [
    {
      name: navigationStrings.HOME,
      component: Home,
      options: {
        headerShown: false,
        tabBarIcon: ({color}) => {
          return <IconEntypo name="home" size={20} color={color} />;
        },
      },
    },
    {
      name: navigationStrings.EXPLORE,
      component: Explore,
      options: {
        headerShown: false,
        tabBarIcon: ({color}) => {
          return <IconAntDesign name="search1" size={20} color={color} />;
        },
      },
    },
    {
      name: navigationStrings.POST,
      component: Post,
      options: {
        ...lightHeaderStyle,
        tabBarIcon: ({color}) => {
          return <IconAntDesign name="plus" size={20} color={color} />;
        },
      },
    },
    {
      name: navigationStrings.CHAT,
      component: Chat,
      options: {
        ...lightHeaderStyle,
        tabBarIcon: ({color}) => {
          return (
            <IconIonicons name="chatbubble-ellipses" size={20} color={color} />
          );
        },
        tabBarBadge: '10',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        animationEnabled: false,
      },
    },
    {
      name: navigationStrings.NOTIFICATION,
      component: Notification,
      options: ({route}) => ({
        ...lightHeaderStyle,
        tabBarIcon: ({color}) => {
          return <IconFontAwesome name="bell" size={18} color={color} />;
        },
      }),
    },
  ];
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: config.color.primary,
        tabBarHideOnKeyboard: isAndroidPlatform ? true : false,
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
      initialRouteName={navigationStrings.HOME}>
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

export default TabStacks;
