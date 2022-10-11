import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {config} from 'app-config';

export default function ListGame({
  photo,
  title,
  subTitle,
  isFree,
  price,
  onPress,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={config.layout.activeOpacity}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
        <Image
          source={{uri: photo}}
          style={{
            width: 55,
            height: 55,
            borderRadius: 10,
            marginRight: 8,
            backgroundColor: '#ecedf0',
          }}
        />
        <View style={{width: config.layout.windowWidth - 220}}>
          <Text
            style={{
              color: '#333',
              fontSize: 14,
            }}>
            {subTitle}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#333',
              fontSize: 14,
              textTransform: 'uppercase',
            }}>
            {title}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: config.color.secondary,
          padding: 10,
          width: 100,
          borderRadius: 10,
        }}>
        <Text
          style={{
            color: config.color.white,
            textAlign: 'center',
            fontSize: 14,
          }}>
          {isFree == 'Yes' && 'Play'}
          {isFree == 'No' && price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
