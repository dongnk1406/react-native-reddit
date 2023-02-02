import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet} from 'react-native';
import Key from './Key';
const KeyBoard = ({correctWord, wordInput, handleSetSelectedKey}) => {
  const [keyboard, setKeyboard] = useState([
    [
      {value: 'q', status: 'normal'},
      {value: 'w', status: 'normal'},
      {value: 'e', status: 'normal'},
      {value: 'r', status: 'normal'},
      {value: 't', status: 'normal'},
      {value: 'y', status: 'normal'},
      {value: 'u', status: 'normal'},
      {value: 'i', status: 'normal'},
      {value: 'o', status: 'normal'},
      {value: 'p', status: 'normal'},
    ],
    [
      {value: 'a', status: 'normal'},
      {value: 's', status: 'normal'},
      {value: 'd', status: 'normal'},
      {value: 'f', status: 'normal'},
      {value: 'g', status: 'normal'},
      {value: 'h', status: 'normal'},
      {value: 'j', status: 'normal'},
      {value: 'k', status: 'normal'},
      {value: 'l', status: 'normal'},
    ],
    [
      {value: 'Enter', status: 'normal'},
      {value: 'z', status: 'normal'},
      {value: 'x', status: 'normal'},
      {value: 'c', status: 'normal'},
      {value: 'v', status: 'normal'},
      {value: 'b', status: 'normal'},
      {value: 'n', status: 'normal'},
      {value: 'm', status: 'normal'},
      {value: 'Del', status: 'normal'},
    ],
  ]);

  useEffect(() => {
    const newKeyBoard = keyboard.map(key => {
      return key.map(item => {
        if (
          wordInput.includes(item.value) &&
          correctWord.includes(item.value) &&
          correctWord[correctWord.indexOf(item.value)] ===
            wordInput[correctWord.indexOf(item.value)]
        ) {
          const newItem = {...item};
          newItem.status = 'correct';
          return newItem;
        } else if (
          wordInput.includes(item.value) &&
          correctWord.includes(item.value)
        ) {
          const newItem = {...item};
          newItem.status = 'almost';
          return newItem;
        } else if (
          wordInput.includes(item.value) &&
          !correctWord.includes(item.value)
        ) {
          const newItem = {...item};
          newItem.status = 'incorrect';
          return newItem;
        } else {
          return item;
        }
      });
    });
    setKeyboard(newKeyBoard);
  }, [correctWord, keyboard, wordInput]);

  return (
    <View style={styles.container}>
      {keyboard.map((key, index) => {
        return (
          <View key={index} style={styles.row}>
            {key.map((item, index) => {
              return (
                <Key
                  key={index}
                  item={item}
                  handleSetSelectedKey={handleSetSelectedKey}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
});

export default memo(KeyBoard);
