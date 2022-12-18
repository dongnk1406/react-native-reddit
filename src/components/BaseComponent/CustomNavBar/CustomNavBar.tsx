import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Keyboard,
  TextInput,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {config, isIOSPlatform} from 'app-config';
import {CustomNavBarProps} from '.';
import {useDebounce} from 'src/hooks';

const CustomNavBar = (props: CustomNavBarProps) => {
  const searchRef = useRef();

  const [searchInput, setSearchInput] = useState<string>('');

  const searchValue = useDebounce<string>(searchInput);

  useEffect(() => {
    console.log('value', searchValue);
  }, [searchValue]);

  const onChangeSearchInput = (value: string) => {
    setSearchInput(value);
  };

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <TouchableOpacity activeOpacity={config.layout.activeOpacity}>
          <IconOcticons name="three-bars" style={styles.navBarIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={config.layout.activeOpacity}
          style={styles.searchBlock}
          onPress={() => searchRef.current.focus()}>
          <IconAntDesign name="search1" style={styles.searchIcon} />
          <TextInput
            ref={searchRef}
            placeholder="Search"
            style={styles.searchInput}
            value={searchInput}
            onChangeText={onChangeSearchInput}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={config.layout.activeOpacity}
          onPress={() => {
            Keyboard.dismiss();
            props.navigation.openDrawer();
          }}>
          <FastImage
            source={{
              uri: 'https://i.redd.it/snoovatar/avatars/16f0557d-0d6d-4b6f-8b2b-ad1b305c8c39.png',
            }}
            style={styles.avatar}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: config.color.white,
    paddingTop: isIOSPlatform ? 0 : 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navBarIcon: {
    fontSize: 20,
  },
  searchBlock: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#ecedf0',
    borderRadius: 5,
    paddingVertical: isIOSPlatform ? 5 : 0,
  },
  searchIcon: {
    fontSize: 16,
    color: '#b7b3b3',
    paddingHorizontal: 5,
  },
  searchInput: {
    flex: 1,
    padding: 0,
    marginVertical: 2,
  },
  avatar: {
    width: 30,
    height: 30,
    backgroundColor: '#ecedf0',
    borderRadius: 15,
  },
});

export default CustomNavBar;
