import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomePage,
  BookMark,
  Training,
  Profile,
  Setting,
  PomoFocus,
} from '../containers';
import {config} from 'app-config';
import {navBarTitle, navigationStrings} from './constants';
import {ListFriend} from 'src/containers/Profile';
import {CustomDrawer} from 'src/components';

const Drawer = createDrawerNavigator();

function DrawerStack({navigation}) {
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
        name={navigationStrings.HOME_PAGE}
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.BOOK_MARK}
        component={BookMark}
        options={{
          headerLeft: () => null,
          headerTitle: navBarTitle.BOOK_MARK,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.TRAINING}
        component={Training}
        options={{
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.PROFILE}
        component={Profile}
        options={{
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.LIST_FRIEND}
        component={ListFriend}
        options={{
          headerTitle: navBarTitle.LIST_FRIEND,
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.SETTING}
        component={Setting}
        options={{
          headerTitle: navBarTitle.SETTING,
          headerLeft: () => null,
        }}
      />
      <Drawer.Screen
        name={navigationStrings.POMO_FOCUS}
        component={PomoFocus}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerStack;
