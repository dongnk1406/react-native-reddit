import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {config, isIphoneX} from 'app-config';
import {navBarTitle, navigationStrings} from 'src/navigation/config/constants';
import BaseSwitch from '../BaseSwitch/BaseSwitch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAppDispatch} from 'src/hooks';
import {signOut} from 'src/store/slices/authSlice';
import {setTheme} from 'src/store/slices/commonSlice';
import {CustomDrawerProps} from '.';

const CustomDrawer = (props: CustomDrawerProps) => {
  const dispatch = useAppDispatch();
  const theme = useColorScheme();
  const [isToggleTheme, setToggleTheme] = useState(theme !== 'light');
  const [themeState, setThemeState] = useState(theme);

  const toggleSwitch = async () => {
    setToggleTheme(previousState => !previousState);
    const themeMode = themeState === 'light' ? 'dark' : 'light';
    setThemeState(themeMode);
    dispatch(setTheme(themeMode));
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={styles.userCompactBlock}
          activeOpacity={config.layout.activeOpacity}
          onPress={() => props.navigation.navigate(navigationStrings.PROFILE)}>
          <Image
            source={{
              uri: 'https://i.redd.it/snoovatar/avatars/16f0557d-0d6d-4b6f-8b2b-ad1b305c8c39.png',
            }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.userName}>Dong NK</Text>
            <Text style={styles.followerLabel}>@dong14</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.userFollowBlock}>
          <TouchableOpacity
            activeOpacity={config.layout.activeOpacity}
            style={{flexDirection: 'row', paddingRight: 10}}
            onPress={() =>
              props.navigation.navigate(navigationStrings.LIST_FRIEND)
            }>
            <Text style={styles.followerAmount}>10</Text>
            <Text style={styles.followerLabel}>Đang theo dõi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{flexDirection: 'row'}}
            activeOpacity={config.layout.activeOpacity}>
            <Text style={styles.followerAmount}>20</Text>
            <Text style={styles.followerLabel}>Người theo dõi</Text>
          </TouchableOpacity>
        </View>

        {/* <DrawerItemList {...props} /> */}

        <View>
          <DrawerItem
            icon={({color, size}) => (
              <IconAntDesign name="home" size={size} color={color} />
            )}
            style={styles.drawerItem}
            label={navBarTitle.HOME}
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate(navigationStrings.HOME_PAGE);
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <IconFontAwesome name="bookmark-o" size={size} color={color} />
            )}
            style={styles.drawerItem}
            label={navBarTitle.BOOK_MARK}
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate(navigationStrings.BOOK_MARK);
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <IconAntDesign name="profile" size={size} color={color} />
            )}
            style={styles.drawerItem}
            label={navBarTitle.TRAINING}
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate(navigationStrings.TRAINING);
            }}
          />

          <DrawerItem
            icon={({color, size}) => (
              <IconFontAwesome5 name="check-circle" size={size} color={color} />
            )}
            style={styles.drawerItem}
            label={navBarTitle.POMO_FOCUS}
            labelStyle={styles.drawerLabel}
            onPress={() => {
              props.navigation.navigate(navigationStrings.POMO_FOCUS);
            }}
          />
        </View>

        <View
          style={{
            marginTop: 10,
            paddingVertical: 10,
            ...styles.borderBlock,
          }}>
          <View style={styles.itemPreference}>
            <Text style={styles.labelItem}>Theme</Text>
            <BaseSwitch onValueChange={toggleSwitch} value={isToggleTheme} />
          </View>
        </View>
      </DrawerContentScrollView>

      <View style={styles.borderBlock}>
        <DrawerItem
          icon={({color, size}) => {
            return <IconAntDesign name="setting" color={color} size={size} />;
          }}
          label={navBarTitle.SETTING}
          style={styles.drawerItem}
          labelStyle={styles.drawerLabel}
          onPress={() => {
            props.navigation.navigate(navigationStrings.SETTING);
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <IconOcticons name="sign-out" color={color} size={size} />
          )}
          style={styles.drawerItem}
          label={navBarTitle.SIGN_OUT}
          labelStyle={styles.drawerLabel}
          onPress={async () => {
            try {
              await AsyncStorage.removeItem('user_token');
              dispatch(signOut());
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  userCompactBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: isIphoneX ? 0 : 10,
  },
  userName: {
    fontSize: 18,
    paddingBottom: 5,
    color: config.color.typography.text,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#ecedf0',
    marginRight: 15,
  },
  userFollowBlock: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  followerAmount: {
    color: config.color.typography.text,
    fontWeight: '700',
    fontSize: 14,
    marginRight: 3,
  },
  followerLabel: {
    color: config.color.typography.secondary,
    fontSize: 14,
  },
  drawerItem: {
    marginHorizontal: 0,
  },
  drawerLabel: {
    marginLeft: -15,
    color: config.color.typography.text,
    fontSize: 14,
    fontWeight: '400',
  },
  labelItem: {
    color: config.color.typography.text,
    fontSize: 14,
  },
  itemPreference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  borderBlock: {
    borderTopWidth: 0.3,
    borderColor: config.color.border,
  },
});

export default CustomDrawer;
