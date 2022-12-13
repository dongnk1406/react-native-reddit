import React, {useCallback, useEffect} from 'react';
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
import {useFetch} from 'src/hooks';
import {config} from 'app-config';
import {NewsProps, Post} from '.';
import {navigationStrings} from 'src/navigation';
import FastImage from 'react-native-fast-image';

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

export default function NewsScreen({navigation}: NewsProps) {
  const {data, error} = useFetch<Post[]>(url);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

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
  });

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
