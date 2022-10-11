import {NavigationProps} from 'src/type';

export {default} from './OnBoarding';

export interface OnBoardingProps extends NavigationProps {}

export interface DescriptionProps {
  data: [
    {
      id: number;
      title: string;
      url: string;
    },
  ];
}
