import {NavigationProp} from '@react-navigation/native';

export {default} from './CustomDrawer';

export interface CustomDrawerProps {
  props: any;
  navigation: NavigationProp<CustomDrawerProps>;
}
