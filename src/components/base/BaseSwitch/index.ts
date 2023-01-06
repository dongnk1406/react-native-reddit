export {default} from './BaseSwitch';

export interface BaseSwitchProps {
  onValueChange: () => void;
  value: boolean;
}
