import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';
import BoardItem from './BoardItem';

const Board = ({board, correctWord, position, row}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentBlock}>
        {board.map((item) => {
          return (
            <BoardItem
              key={item.id}
              item={item}
              correctWord={correctWord}
              position={position}
              row={row}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentBlock: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default memo(Board);
