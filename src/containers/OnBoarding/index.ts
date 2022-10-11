import {NavigationProp, ParamListBase} from '@react-navigation/native';
export {default} from './OnBoarding';

export interface OnBoardingProps {

    navigation: NavigationProp<ParamListBase>;
}

export interface DescriptionProps {
  data: [
    {
      id: number;
      title: string;
      url: string;
    },
  ];


  
}
