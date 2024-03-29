import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BookMark, Training, Profile, Setting, PomoFocus} from 'src/containers';
import {config} from 'app-config';
import {navBarTitle, navigationRoutes} from '../config/constants';
import {ListFriend} from 'src/containers/Profile';
import {CustomDrawer} from 'src/components';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerPosition: 'right',
        drawerStyle: {
          width: (config.layout.windowWidth * 3) / 4,
        },
        headerStyle: {
          backgroundColor: config.color.primary,
        },
        headerTitleStyle: {
          color: config.color.white,
        },
        headerTitleAlign: 'center',
      }}>
      <Drawer.Screen
        name={navigationRoutes.HOME_PAGE}
        component={TabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={navigationRoutes.BOOK_MARK}
        component={BookMark}
        options={{
          headerLeft: () => null,
          headerTitle: navBarTitle.BOOK_MARK,
        }}
      />
      <Drawer.Screen
        name={navigationRoutes.TRAINING}
        component={Training}
        options={{
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationRoutes.PROFILE}
        component={Profile}
        options={{
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationRoutes.LIST_FRIEND}
        component={ListFriend}
        options={{
          headerTitle: navBarTitle.LIST_FRIEND,
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationRoutes.SETTING}
        component={Setting}
        options={{
          headerTitle: navBarTitle.SETTING,
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationRoutes.POMO_FOCUS}
        component={PomoFocus}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerStack;
