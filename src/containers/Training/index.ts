import {NavigationProp, ParamListBase, RouteProp} from '@react-navigation/native';
import TrainingItemScreen from './TrainingItem';

export interface TrainingItemProps {
  navigation: NavigationProp<ParamListBase>;
  route: any;
}

export {default} from './Training';
export {TrainingItemScreen as TrainingItem};
