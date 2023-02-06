import React, {useState} from 'react';
import {View, ScrollView, Text, Image} from 'react-native';
import {useGetPokemonByNameQuery} from 'src/store/slices/pokemonSlice';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  Bar,
  VictoryTooltip,
} from 'victory-native';

import {NotificationProps} from '.';

const NotificationScreen = ({}: NotificationProps) => {
  const [activeBar, setActiveBar] = useState(false);
  const {data, error, isLoading, isFetching} = useGetPokemonByNameQuery(
    'bulbasaur',
    {},
  );

  return (
    <ScrollView contentContainerStyle={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <VictoryChart domain={{x: [0, 5]}}>
          <VictoryBar
            barWidth={30}
            cornerRadius={{top: 4}}
            data={[
              {x: 1, y: 5},
              {x: 2, y: 4},
              {x: 3, y: 3},
              {x: 4, y: 2},
              {x: 5, y: 1},
            ]}
            alignment="middle"
            animate={{
              duration: 500,
              onLoad: {duration: 500},
            }}
            dataComponent={
              <Bar
                events={{onPress: () => setActiveBar(!activeBar)}}
                style={{fill: activeBar ? '#ad1c6d' : '#E3F2FF'}}
              />
            }
            labels={() => `RM ${String(Math.round(20))}`}
            labelComponent={
              <VictoryTooltip
                active={activeBar}
                pointerWidth={0}
                pointerLength={10}
                flyoutPadding={{top: 4, bottom: 4, left: 10, right: 10}}
                flyoutStyle={{backgroundColor: 'red'}}
              />
            }
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: {
                stroke: 'transparent',
              },
              tickLabels: {
                fill: '#78849E',
              },
            }}
          />
          <VictoryAxis
            label={'Hello'}
            style={{
              axis: {
                stroke: '#BDC5D8',
              },
              tickLabels: {
                fill: '#78849E',
              },
            }}
          />
        </VictoryChart>
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        {error ? (
          <Text>Oh no, there was an error</Text>
        ) : isLoading ? (
          <Text>Loading...</Text>
        ) : isFetching ? (
          <Text>Fetching...</Text>
        ) : data ? (
          <>
            <Text>{data.species.name}</Text>
            <Image
              source={{uri: data.sprites.front_shiny}}
              style={{width: 100, height: 100}}
            />
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;
