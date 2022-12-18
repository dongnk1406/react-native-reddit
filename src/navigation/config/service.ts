import React, {RefObject} from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';
import {navigationStrings} from 'src/navigation';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(name: string, params = {}): void {
  navigationRef.current.navigate(name, params);
}

export function goBack(): void {
  navigationRef.current.goBack();
}

export function replace(name: string, params = {}): void {
  navigationRef.current.dispatch(StackActions.replace(name, params));
}

export function reset(routes = [{name: navigationStrings.HOME_PAGE}]): void {
  navigationRef.current.dispatch({
    ...CommonActions.reset({
      index: 1,
      routes,
    }),
  });
}

export function canGoBack(): boolean {
  return navigationRef.current.canGoBack();
}

export function pop(num?: number): void {
  navigationRef.current.dispatch(StackActions.pop(num));
}

export function push(name: string, params = {}): void {
  navigationRef.current.dispatch(StackActions.push(name, params));
}
