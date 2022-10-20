import {NavigationProps} from 'src/type';

export interface PomoFocusProps extends NavigationProps {}

export interface TimeProps {
  timeCountDown?: number;
  counting?: boolean;
}

export {default} from './PomoFocus';
