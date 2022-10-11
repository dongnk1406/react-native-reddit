import React, {memo, useMemo, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  SafeAreaView,
} from 'react-native';
import Time from './Time/Time';

const today = new Date();
const dateTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const arr2DTimeHorizontal = [];
const arr2DTimeVertical = [];

function TimeSelector(props) {
  const {arr1DTime} = props;
  const [selectedId, setSelectedId] = useState(null);
  const [timeSelector, setTimeSelector] = useState(dateTime);
  const [isHorizontal, setHorizontal] = useState(true);
  const [numberRows, setNumberRows] = useState(14);

  const handleSetSelectedId = id => {
    setSelectedId(prev => {
      if (prev === id) {
        return null;
      } else {
        return id;
      }
    });
  };

  const handleSetTimeSelector = value => {
    setTimeSelector(value);
  };

  const setArr2DTimeHorizontal = () => {
    let tmp = 0;
    for (let i = 0; i < numberRows; i++) {
      arr2DTimeHorizontal[i] = [];
      for (let j = 0; j < Math.round(arr1DTime.length / numberRows); j++) {
        if (arr1DTime[tmp] === undefined) return;
        arr2DTimeHorizontal[i][j] = arr1DTime[tmp];
        tmp++;
      }
    }
  };

  const setArr2DTimeVertical = () => {
    let tmp = 0;
    for (let i = 0; i < Math.round(arr1DTime.length / numberRows); i++) {
      arr2DTimeVertical[i] = [];
      for (let j = 0; j < numberRows; j++) {
        if (arr1DTime[tmp] === undefined) return;
        arr2DTimeVertical[i][j] = arr1DTime[tmp];
        tmp++;
      }
    }
  };

  setArr2DTimeHorizontal();
  setArr2DTimeVertical();

  const selectedHour = useMemo(() => {
    return timeSelector.split(':')[0];
  }, [timeSelector]);

  const selectedMinute = useMemo(() => {
    return timeSelector.split(':')[1];
  }, [timeSelector]);

  return (
    <View style={styles.container}>
      <View style={styles.timeSelectorBlock}>
        <View style={styles.timeSelector}>
          <View>
            <Text style={styles.timeSelectorText}>{selectedHour}</Text>
            <Text style={styles.timeDescription}>Hour</Text>
          </View>
          <Text style={styles.timeSelectorText}>:</Text>
          <View>
            <Text style={styles.timeSelectorText}>{selectedMinute}</Text>
            <Text style={styles.timeDescription}>Minutes</Text>
          </View>
        </View>
        <View style={styles.timeDirection}>
          <TouchableOpacity onPress={() => setHorizontal(false)}>
            <Text style={styles.timeDirectionText}>Vertical</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setHorizontal(true)}>
            <Text style={styles.timeDirectionText}>Horizontal</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TextInput
        value={numberRows}
        onChangeText={text => setNumberRows(Number(text) || 1)}
        style={{
          padding: 15,
          backgroundColor: '#eee',
        }}
      />

      <Time
        arr2DTimeVertical={arr2DTimeVertical}
        arr2DTimeHorizontal={arr2DTimeHorizontal}
        arr1DTime={arr1DTime}
        isHorizontal={isHorizontal}
        selectedId={selectedId}
        numberRows={numberRows}
        handleSetSelectedId={handleSetSelectedId}
        handleSetTimeSelector={handleSetTimeSelector}
      />
    </View>
  );
}

function App() {
  const arr1DTime = useMemo(() => {
    const tempArr1DTime = [];

    let hour = 0,
      minute,
      time_stamp = '';
    for (let i = 0; i < 48; i++) {
      if (i % 2 === 0) {
        minute = '00';
      } else {
        minute = '30';
      }

      if (Math.floor(hour / 2) < 10) {
        time_stamp = `0${Math.floor(hour / 2)}:${minute}`;
      } else {
        time_stamp = `${Math.floor(hour / 2)}:${minute}`;
      }

      tempArr1DTime.push({id: i, time_stamp: time_stamp, disable: false});
      hour++;
    }

    return tempArr1DTime;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <TimeSelector arr1DTime={arr1DTime} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timeSelectorBlock: {
    backgroundColor: '#802384',
    justifyContent: 'center',
    alignItems: 'center',
  },

  timeSelector: {
    borderRadius: 20,
    backgroundColor: '#9c649f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 16,
  },
  timeSelectorText: {
    fontSize: 68,
    color: '#fff',
    fontWeight: '800',
    paddingRight: 8,
  },
  timeDirection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e0e0',
  },
  timeDirectionText: {
    fontSize: 16,
    color: '#fff',
    paddingRight: 8,
    marginHorizontal: 14,
  },
  inputTime: {
    backgroundColor: '#9c649f',
    padding: 14,
  },
});

export default memo(App);
