import React, {RefObject} from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

export const navigationRef: RefObject<any> = React.createRef();

export function navigate(route: string, params?: object): void {
  navigationRef.current.navigate(route, params);
}

export function goBack(): void {
  navigationRef.current.goBack();
}

export function replace(route: string, params?: object): void {
  navigationRef.current.dispatch(StackActions.replace(route, params));
}

export function reset(route: string, params?: object): void {
  navigationRef.current.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [{name: route, params}],
    }),
  );
}

export function canGoBack(): boolean {
  return navigationRef.current.canGoBack();
}

export function pop(num?: number): void {
  navigationRef.current.dispatch(StackActions.pop(num));
}

export function popToTop(): void {
  navigationRef.current.dispatch(StackActions.popToTop());
}

export function push(name: string, params?: object): void {
  navigationRef.current.dispatch(StackActions.push(name, params));
}
