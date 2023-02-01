import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {config} from 'app-config';
import {navigationRoutes} from 'src/navigation';
import { BannerSliderProps } from '.';

export default function BannerSlider({data}: BannerSliderProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={config.layout.activeOpacity}
      onPress={() => navigation.navigate(navigationRoutes.TRAINING_ITEM)}>
      <Image
        source={{uri: data.image}}
        style={{height: 150, width: 300, borderRadius: 10}}
      />
    </TouchableOpacity>
  );
}
