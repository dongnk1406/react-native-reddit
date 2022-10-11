import {NavigationProp, ParamListBase} from '@react-navigation/native';
export {default} from './News';

export interface NewsProps {
    navigation: NavigationProp<ParamListBase>;
}

export interface Post {
    id: number;
    name: string;
    avatar: string;
  }
  
