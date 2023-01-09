import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Linking,
  Alert,
  Button,
} from 'react-native';
import {useAppSelector, useFetch, useGeolocation} from 'src/hooks';
import {config} from 'app-config';
import {NewsProps, Post} from '.';
import {navigationStrings} from 'src/navigation';
import FastImage from 'react-native-fast-image';
import Share from 'react-native-share';
import Modal from 'react-native-modal';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AsyncStorageManager from 'src/helper/AsyncStorageManager';
import {useTheme} from 'src/theme';
import {showMessage} from 'react-native-flash-message';
import {
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import {getFCMToken, notificationHandler} from 'src/helper/pushNotification';

const url = `https://62ff2c7134344b6431f3db0c.mockapi.io/api/v1/list-friend`;

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';

const OpenURLButton = ({url, children}: {url: string; children?: any}) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

const IMAGE_SIZE = (config.layout.windowWidth - 20) / 3;

export default function NewsScreen() {
  const {data, error} = useFetch<Post[]>(url);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ipAddress, setIpAddress] = useState<string>('');
  const [token, setToken] = useState<any>();
  const theme = useAppSelector(state => state.common.theme);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      console.log('token', token);
      notificationHandler();
    }, []),
  );

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const test = async () => {
    const res = await getFCMToken();
    setToken(res);
  };

  useEffect(() => {
    Linking.getInitialURL()
      .then(url => {
        if (url) {
          Alert.alert('Hello', url);
        }

        Linking.addEventListener('url', url => {
          if (url) {
            Alert.alert('Hello get', url);
          }
        });
      })
      .catch(() => {});
  }, []);

  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={config.color.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: theme === 'light' ? 'white' : '#605c5c',
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[config.color.primary]}
          tintColor={config.color.primary}
        />
      }>
      <View>
        <OpenURLButton url={supportedURL}>Open Supported URL</OpenURLButton>
        <OpenURLButton url={unsupportedURL}>Open Unsupported URL</OpenURLButton>
        <Button
          title="Open setting"
          onPress={async () => {
            await Linking.openSettings();
          }}
        />
        <Button
          title="Share"
          onPress={async () => {
            try {
              const shareResponse = await Share.open({
                title: 'Share title',
                subject: 'https://awesome.contents.com/',
                message: 'Share message',
              });
              console.log('res', shareResponse);
            } catch (error) {
              console.log(error);
            }
          }}
        />

        <Button title="Open Modal" onPress={toggleModal} />
        <Button
          title="Get Ip"
          onPress={() => {
            DeviceInfo.getIpAddress().then(ip => {
              setIpAddress(ip);
            });
          }}
        />
        {!!ipAddress && <Text>{ipAddress}</Text>}
        <Button title="Show ip" onPress={toggleModal} />
        <Modal
          isVisible={isModalVisible}
          coverScreen={true}
          backdropOpacity={0.4}
          backdropColor={config.color.black}
          onBackdropPress={() => setModalVisible(false)}>
          <View
            style={{
              height: 50,
              backgroundColor: 'white',
              borderRadius: 8,
              justifyContent: 'center',
            }}>
            <Text style={{textAlign: 'center'}}>
              This is the modal content!
            </Text>
          </View>
        </Modal>
      </View>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingTop: 5,
          paddingBottom: 50,
        }}>
        {data.map(item => {
          return (
            <TouchableOpacity
              activeOpacity={config.layout.activeOpacity}
              key={item.id}
              style={{marginLeft: 5, marginBottom: 5}}
              onPress={() =>
                navigation.navigate(navigationStrings.GAME_DETAIL, {
                  headerTitle: item.name,
                })
              }>
              <FastImage
                source={{uri: item.avatar}}
                style={{
                  height: IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}
