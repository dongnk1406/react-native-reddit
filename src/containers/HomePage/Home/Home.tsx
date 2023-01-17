import {config} from 'app-config';
import React, {useRef, useState} from 'react';
import {CustomNavBar} from 'src/components';
import News from './News';
import Popular from './Popular';
import {TabView, TabBar} from 'react-native-tab-view';
import {SafeAreaView, Text} from 'react-native';
import {useScrollToTop} from '@react-navigation/native';

const marginIndicator = (config.layout.windowWidth / 2 - 40) / 2;

function Home(props) {
  const [index, setIndex] = useState<number>(0);
  const scrollRef = useRef(null);
  useScrollToTop(scrollRef);

  const [routes] = useState([
    {key: 'News', title: 'News'},
    {key: 'Popular', title: 'Popular'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'News':
        return <News currentIndex={index} ref={scrollRef} />;
      case 'Popular':
        return <Popular currentIndex={index} />;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: config.color.white}}>
      <CustomNavBar {...props} />
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
            // tabStyle={{width: 'auto', paddingHorizontal: 20}}
            // scrollEnabled
            indicatorContainerStyle={{marginHorizontal: marginIndicator}}
            indicatorStyle={{
              backgroundColor: config.color.primary,
              width: 40,
              height: 4,
              borderTopRightRadius: 8,
              borderTopLeftRadius: 8,
            }}
            renderLabel={({route, focused}) => (
              <Text
                style={{
                  color: focused
                    ? config.color.primary
                    : config.color.placeholder,
                  fontWeight: focused ? '500' : null,
                }}>
                {route.title}
              </Text>
            )}
            style={{backgroundColor: config.color.white}}
          />
        )}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={index => {
          setIndex(index);
        }}
        initialLayout={{width: config.layout.windowWidth}}
      />
    </SafeAreaView>
  );
}

export default Home;
