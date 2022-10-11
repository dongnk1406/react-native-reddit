import {NavigationProp, ParamListBase} from '@react-navigation/native';

export type TNavigationProp = NavigationProp<ParamListBase>;

export interface NavigationProps {
  navigation: TNavigationProp;
}
