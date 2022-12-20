import React, {useEffect} from 'react';
import isEqual from 'react-fast-compare';
import {useAppDispatch, useAppSelector} from 'src/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {restoreToken} from 'src/redux/slices/authSlice';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import {Launch} from 'src/containers';
import {RootState} from 'src/redux';

const RootStack = () => {
  const userToken = useAppSelector(
    (state: RootState) => state.auth.userToken,
    isEqual,
  );
  const loading = useAppSelector((state: RootState) => state.common.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getAsyncStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('user_token');
        dispatch(restoreToken(token));
      } catch (error) {
        console.log(error);
      }
    };
    getAsyncStorage();
  }, [dispatch]);

  if (loading) {
    return <Launch />;
  }

  if (userToken) {
    return <AppStack />;
  }
  return <AuthStack />;
};

export default RootStack;
