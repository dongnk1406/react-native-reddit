import React from 'react';
import { TrainingItemProps } from '.';

const TrainingItemScreen = ({navigation, route}: TrainingItemProps) => {
  return <>{route.params?.children}</>;
};

export default TrainingItemScreen;
