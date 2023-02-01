import React, {useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryAxis,
  Bar,
  VictoryTooltip,
} from 'victory-native';

import {NotificationProps} from '.';

const NotificationScreen = ({}: NotificationProps) => {
  const [activeBar, setActiveBar] = useState(false);
  return (
    <ScrollView>
      <View style={styles.container}>
        <VictoryChart
          domain={{x: [0, 5]}}
          containerComponent={
            <VictoryContainer disableContainerEvents={true} />
          }>
          <VictoryBar
            barWidth={30}
            cornerRadius={{top: 4}}
            data={[
              {x: 1, y: 2},
              {x: 2, y: 4},
              {x: 3, y: 1},
              {x: 4, y: 5},
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default NotificationScreen;
