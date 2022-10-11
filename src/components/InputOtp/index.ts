export {default} from './InputOtp';

export interface InputOtpProps {
  pinLength?: number;
  pasteable?: boolean;
  onChangeCode?: (text: string) => void;
  onSubmitEditing?: () => void;
}
