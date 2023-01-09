import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import StyledWebView from 'src/components/base/StyledWebView';
import {stringOverShowDot} from 'src/helper';

const WebViewScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {uri} = route?.params;
  return (
    <StyledWebView
      source={{
        uri: uri,
      }}
      onNavigationStateChange={state => {
        navigation.setOptions({
          title: stringOverShowDot(state?.title),
        });
      }}
    />
  );
};

export default WebViewScreen;
