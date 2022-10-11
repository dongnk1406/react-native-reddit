import React from 'react';
import TabView from './TabView';
import {CustomNavBar} from 'src/components';

function Home(props) {
  return (
    <>
      <CustomNavBar {...props} />
      <TabView />
    </>
  );
}

export default Home;
