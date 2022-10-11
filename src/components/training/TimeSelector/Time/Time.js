import React, {memo, useMemo} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const Item = ({item, onPress, backgroundColor, textColor}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filedTime, {backgroundColor: backgroundColor}]}>
      <Text style={[styles.filedTimeText, {color: textColor}]}>
        {item.time_stamp}
      </Text>
    </TouchableOpacity>
  );
};

function Time({
  arr1DTime,
  arr2DTimeVertical,
  arr2DTimeHorizontal,
  selectedId,
  handleSetSelectedId,
  handleSetTimeSelector,
  isHorizontal,
  numberRows,
}) {
  const timeList = useMemo(() => {
    const result = [];
    let blockTimes = [];

    if (isHorizontal) {
      let colIndex = 0,
        rowIndex = 0,
        maxCol = numberRows,
        maxRowInACol = Math.ceil(arr1DTime.length / maxCol),
        isBreak = true;

      function getTimeIndex() {
        return colIndex + rowIndex * maxRowInACol;
      }

      arr1DTime.map((n, i) => {
        let timeIndex = getTimeIndex();
        isBreak = (i + 1) % maxCol === 0 || i === arr1DTime.length - 1;

        if (timeIndex > arr1DTime.length - 1) {
          colIndex++;
          rowIndex = 0;
          timeIndex = getTimeIndex();
          result.push(blockTimes);
          blockTimes = [];
          isBreak = false;
        }

        rowIndex++;

        blockTimes.push(arr1DTime[timeIndex]);

        if (isBreak) {
          colIndex++;
          rowIndex = 0;
          result.push(blockTimes);
          blockTimes = [];
        }
      });
    } else {
      arr1DTime.forEach((time, index) => {
        blockTimes.push(time);

        if ((index + 1) % numberRows === 0 || index === arr1DTime.length - 1) {
          result.push(blockTimes);
          blockTimes = [];
        }
      });
    }

    return result;
  }, [isHorizontal, arr1DTime, numberRows]);

  const renderItem = props => {
    return (
      <View key={props.index} style={!isHorizontal && styles.containerItem}>
        {props.item.map(data => {
          const backgroundColor = data.id === selectedId ? '#802384' : '#fff';
          const color = data.id === selectedId ? '#fff' : '#000';
          return (
            <Item
              key={data.id}
              item={data}
              selectedId={selectedId}
              onPress={() => {
                handleSetSelectedId(data.id);
                handleSetTimeSelector(data.time_stamp);
              }}
              backgroundColor={backgroundColor}
              textColor={color}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={isHorizontal}
        data={timeList}
        renderItem={renderItem}
        extraData={item => item.map(data => data.id.toString())}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: {
    flexDirection: 'row',
  },
  filedTime: {
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#802384',
    borderRadius: 12,
    marginHorizontal: 4,
    marginTop: 16,
    // width: 90,
    // height: 50,
  },
  filedTimeText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default memo(Time);
