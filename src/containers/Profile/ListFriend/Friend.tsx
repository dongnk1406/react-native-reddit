import React, { memo } from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import moment from 'moment';
import 'moment/min/moment-with-locales';
import {config} from 'app-config';
import {FriendProps} from '.';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 5,
    backgroundColor: config.color.white,
    borderRadius: 10,
    padding: 15,
    ...config.color.shadow,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  detailBlock: {
    paddingLeft: 20,
    flex: 1,
  },
  detailName: {
    fontSize: 16,
    color: config.color.primary,
  },
  descriptionBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  description: {
    color: config.color.gray,
  },
});

const Friend = ({data, scale, opacity}: FriendProps) => {
  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: scale,
          },
        ],
        opacity: opacity,
      }}
      >
      <TouchableOpacity activeOpacity={config.layout.activeOpacity} style={styles.container}>
        <Image source={{uri: data.avatar}} style={styles.image} />
        <View style={styles.detailBlock}>
          <Text style={styles.detailName}>{data.name}</Text>
          <View style={styles.descriptionBlock}>
            <Text style={styles.description}>{data.id}</Text>
            <Text style={styles.description}>
              {moment.utc(data.createdAt).local().startOf('hours').fromNow()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(Friend);
