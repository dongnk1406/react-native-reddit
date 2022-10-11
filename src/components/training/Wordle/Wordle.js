import React, {useState, memo, useCallback} from 'react';
import {SafeAreaView, StyleSheet, Text, Alert, DevSettings} from 'react-native';

import Board from './Board';
import KeyBoard from './KeyBoard';
import wordList from './words.json';

const Wordle = props => {
  const randomNum = Math.floor(Math.random() * wordList.words.length);
  const initBoard = Array.from({length: 30}).map((_, i) => {
    return {id: i, content: ''};
  });
  const [board, setBoard] = useState(initBoard);
  const [correctWord] = useState(wordList.words[randomNum]);
  const [position, setPosition] = useState(0);
  const [row, setRow] = useState(0);
  const [wordInput, setWordInput] = useState('');

  const handleAddCharInput = useCallback(
    (position, value) => {
      let nextRow = Math.floor(position / 5);
      if (position === 30 || nextRow > row) return;
      const newBoard = [...board];
      newBoard[position].content = value;
      setPosition(prev => prev + 1);
      setBoard(newBoard);
    },
    [position, row],
  );

  const handleValidWordInputInWordList = useCallback(
    position => {
      if (position % 5 !== 0 || position === 0) {
        Alert.alert('Opps ⛄', 'Not enough letters', [
          {
            text: 'OK',
          },
        ]);
        return;
      }

      const wordInput5Char = `${board[position - 5].content}${
        board[position - 4].content
      }${board[position - 3].content}${board[position - 2].content}${
        board[position - 1].content
      }`;

      if (!wordList.words.includes(wordInput5Char)) {
        Alert.alert('Opps ⛄', 'Not in word list', [
          {
            text: 'OK',
          },
        ]);
        return;
      } else if (wordInput5Char === correctWord) {
        setRow(row + 1);
        Alert.alert('Congratulations 🔥', 'You win ', [
          {
            text: 'Replay',
          },
        ]);
        return;
      } else if (position === 30 && wordInput5Char !== correctWord) {
        setRow(row + 1);
        Alert.alert('Opps ⛄', 'You lose', [
          {
            text: 'Replay',
          },
        ]);
        return;
      }

      setWordInput(wordInput5Char);
      setRow(prev => prev + 1);
    },
    [position, row],
  );

  const handleDeleteCharInput = useCallback(
    position => {
      const preRow = Math.floor((position - 1) / 5);
      if (position <= 0 || preRow < row) return;

      const newBoard = [...board];
      newBoard[position - 1].content = '';
      setPosition(prev => prev - 1);
      setBoard(newBoard);
    },
    [position, row],
  );

  const handleSetSelectedKey = useCallback(
    value => {
      switch (value) {
        case 'Del':
          handleDeleteCharInput(position);
          break;
        case 'Enter':
          handleValidWordInputInWordList(position);
          break;
        default:
          handleAddCharInput(position, value);
      }
    },
    [position, row],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Wordlee {correctWord}</Text>
      <Board
        board={board}
        correctWord={correctWord}
        position={position}
        row={row}
      />
      <KeyBoard
        row={row}
        correctWord={correctWord}
        wordInput={wordInput}
        handleSetSelectedKey={handleSetSelectedKey}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
  },
});
export default memo(Wordle);
