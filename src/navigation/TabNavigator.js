import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Home, Post, Chat, Explore, Notification} from '../containers/HomePage';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {navigationStrings} from 'src/navigation';
import {config} from 'app-config';

const lightHeaderStyle = {
  headerTitleStyle: {},
  headerTitleAlign: 'center',
  headerTintColor: config.color.white,
  headerStyle: {
    backgroundColor: config.color.primary,
  },
};

const Tabs = [
  {
    name: navigationStrings.HOME,
    component: Home,
    options: {
      headerShown: false,
      tabBarIcon: ({color, size}) => {
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
        return <IconEntypo name="grooveshark" size={20} color={color} />;
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
      title: route.params?.headerTitle || navBarTitle.PROFILE,
      ...lightHeaderStyle,
    }),
    options: {
      ...lightHeaderStyle,
      tabBarIcon: ({color}) => {
        return <IconFontAwesome name="bell" size={20} color={color} />;
      },
    },
  },
];

export {Tabs};
