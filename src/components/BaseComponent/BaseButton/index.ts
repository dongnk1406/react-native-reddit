export {default} from './BaseButton';

export interface BaseButtonProps {
  label: string;
  onPress: () => void;
  uppercase?: boolean;
}
