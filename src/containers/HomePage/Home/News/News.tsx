import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useFetch} from 'src/hooks';
import {config} from 'app-config';
import {NewsProps, Post} from '.';
import {navigationStrings} from 'src/navigation';
import FastImage from 'react-native-fast-image';

const url = `https://62ff2c7134344b6431f3db0c.mockapi.io/api/v1/list-friend`;

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
