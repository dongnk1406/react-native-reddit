import React, {useCallback, useEffect} from 'react';
import {Linking} from 'react-native';
import isEqual from 'react-fast-compare';
import {useAppSelector} from 'src/hooks';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {Launch} from 'src/containers';
import {RootState} from 'src/store';
import {navigationRoutes} from '../config/constants';
import {navigate} from '../config/service';

const RootStack = () => {
  const userToken = useAppSelector(
    (state: RootState) => state.auth.userToken,
    isEqual,
  );
  const loading = useAppSelector((state: RootState) => state.common.loading);

  const navigateTo = useCallback((url: string) => {
    if (url !== null) {
      const route = (url && url.replace(/.*?:\/\//g, '')) ?? '';
      const routeName = route.split('/')[0];
      switch (routeName) {
        case 'explore':
          return navigate(navigationRoutes.EXPLORE);
        case 'notification':
          return navigate(navigationRoutes.NOTIFICATION);
        default:
          return navigate(navigationRoutes.HOME);
      }
    }
  }, []);

  const handleRedirect = useCallback(
    (url?: string | null) => {
      if (!url || !url.length) {
        return;
      }
      // guard
      else if (url.endsWith('tcc')) {
        console.log('tcc');
        return;
      } else if (url.startsWith('passwordless')) {
        console.log('passwordless');
        return;
      } else if (url.startsWith('my-dream-app')) {
        navigateTo(url);
      }
    },
    [navigateTo],
  );

  useEffect(() => {
    Linking.getInitialURL().then(url => handleRedirect(url)); // app launched
    Linking.addEventListener('url', ({url}) => handleRedirect(url)); // app running in background
  }, [handleRedirect]);

  if (loading) {
    return <Launch />;
  }

  if (userToken) {
    return <AppStack />;
  }
  return <AuthStack />;
};

export default RootStack;
