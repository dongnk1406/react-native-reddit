import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {freeGames, paidGames, sliderData} from 'app-data';
import {CustomSwitch, ListGame, BannerSlider} from 'src/components';
import {config} from 'app-config';
import {navigationStrings} from 'src/navigation';

const ExploreScreen = ({navigation}) => {
  const [gamesTab, setGamesTab] = useState(1);

  const renderBanner = ({item}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: config.color.white}}>
      <ScrollView style={{paddingHorizontal: 15}}>
        <View
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18}}>Upcoming Games</Text>
          <TouchableOpacity
            activeOpacity={config.layout.activeOpacity}>
            <Text style={{color: config.color.primary}}>See all</Text>
          </TouchableOpacity>
        </View>
        <Carousel
          autoplay
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={config.layout.windowWidth - 40}
          itemWidth={300}
          loop
        />
        <View style={{marginVertical: 15}}>
          <CustomSwitch
            selectionMode={1}
            option1="Free to play"
            option2="Paid games"
            onSelectSwitch={onSelectSwitch}
          />
        </View>
        {gamesTab == 1 &&
          freeGames.map(item => (
            <ListGame
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              onPress={() =>
                navigation.navigate(navigationStrings.GAME_DETAIL, {
                  headerTitle: item.title,
                  id: item.id,
                })
              }
            />
          ))}
        {gamesTab == 2 &&
          paidGames.map(item => (
            <ListGame
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
              onPress={() =>
                navigation.navigate(navigationStrings.GAME_DETAIL, {
                  headerTitle: item.title,
                  id: item.id,
                })
              }
            />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;
