import { NavigationProps } from 'src/type';

export {default} from './News';

export interface NewsProps extends NavigationProps {
}

export interface Post {
  id: number;
  name: string;
  avatar: string;
}
