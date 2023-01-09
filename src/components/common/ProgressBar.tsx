import {config} from 'app-config';
import React from 'react';
import {Text, View} from 'react-native';

export const ProgressBar = ({
  progress = 23,
  colorBar = config.color.primary,
  backgroundColorBar = '#fff',
  hidePercentage = false,
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text style={{color: config.color.primary}}>`${progress}%`</Text>
      <View
        style={[
          styles.container,
          {
            marginLeft: hidePercentage ? 0 : 16,
            backgroundColor: backgroundColorBar,
          },
        ]}>
        <View
          style={{
            width: `${progress}%`,
            height: 8,
            backgroundColor: colorBar ? colorBar : config.color.primary,
            alignItems: 'flex-end',
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    height: 10,
    width: '100%',
    borderRadius: 16,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: config.color.placeholder,
  },
  progressBar: {
    height: 8,
    backgroundColor: config.color.primary,
    alignItems: 'flex-end',
    borderRadius: 16,
  },
};
