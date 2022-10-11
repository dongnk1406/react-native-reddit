import React from 'react';
import {Text, Box, ScrollView} from 'native-base';

import {NotificationProps} from '.';

const NotificationScreen = ({}: NotificationProps) => {
  return (
    <ScrollView>
      <Box>
        <Text>Hello</Text>
      </Box>
    </ScrollView>
  );
};

export default NotificationScreen;
