import {config} from 'app-config';
import React, {useState} from 'react';
import {CustomNavBar, ScreenContainer} from 'src/components';
import News from './News';
import Popular from './Popular';
import {TabView, TabBar} from 'react-native-tab-view';
import {Text} from 'react-native';

const marginIndicator = (config.layout.windowWidth / 2 - 40) / 2;

function Home(props) {
  const [index, setIndex] = useState<number>(0);

  const [routes] = useState([
    {key: 'News', title: 'News'},
    {key: 'Popular', title: 'Popular'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'News':
        return <News currentIndex={index} />;
      case 'Popular':
        return <Popular currentIndex={index} />;
    }
  };

  return (
    <ScreenContainer>
      <CustomNavBar {...props} />
      <TabView
        renderTabBar={props => (
          <TabBar
            {...props}
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
    </ScreenContainer>
  );
}

export default Home;
