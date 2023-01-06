import React from 'react';
import isEqual from 'react-fast-compare';
import {useAppSelector} from 'src/hooks';

import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {Launch} from 'src/containers';
import {RootState} from 'src/store';

const RootStack = () => {
  const userToken = useAppSelector(
    (state: RootState) => state.auth.userToken,
    isEqual,
  );
  const loading = useAppSelector((state: RootState) => state.common.loading);

  // useEffect(() => {
  //   const getAsyncStorage = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('user_token');
  //       dispatch(restoreToken(token));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAsyncStorage();
  // }, [dispatch]);

  if (loading) {
    return <Launch />;
  }

  if (userToken) {
    return <AppStack />;
  }
  return <AuthStack />;
};

export default RootStack;
