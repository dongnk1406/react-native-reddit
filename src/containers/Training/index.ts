import {NavigationProps} from 'src/type';
import TrainingItemScreen from './TrainingItem';

export interface TrainingItemProps extends NavigationProps {
  route: any;
}

export {default} from './Training';
export {TrainingItemScreen as TrainingItem};
