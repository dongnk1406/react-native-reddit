import React from 'react';
import {Text, ScrollView, View, SafeAreaView} from 'react-native';
import {navigationStrings} from 'src/navigation';
import {BaseButton} from 'src/components';
import {
  Wordle,
  ListFruits,
  FinanceManagement,
  TimeSelector,
  Sun,
  AnalogClock,
  Game2048,
} from 'src/components/training';

const trainings = [
  ListFruits,
  FinanceManagement,
  TimeSelector,
  Wordle,
  Sun,
  AnalogClock,
  Game2048,
];

const trainingsTitle = [
  'List Fruits',
  'Finance Management',
  'Time Selector',
  'Wordle',
  'Sun',
  'Analog Clock',
  'Game 2048',
];

function TrainingScreen({navigation}) {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text>This is all my training at Abaha Global</Text>
          <Text>Leader: MinhNH</Text>
        </View>
        <View>
          {trainings.map((TrainingItem, i) => {
            return (
              <BaseButton
                key={i}
                label={trainingsTitle[i] || `Training ${i}`}
                onPress={() =>
                  navigation.navigate(navigationStrings.TRAINING_ITEM, {
                    children: <TrainingItem />,
                    headerTitle: trainingsTitle[i] || `Training ${i}`,
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default TrainingScreen;
