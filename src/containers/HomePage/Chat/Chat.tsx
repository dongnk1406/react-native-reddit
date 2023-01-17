import {useFocusEffect} from '@react-navigation/native';
import {config} from 'app-config';
import React, {useCallback, useRef, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export default function ChatScreen() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const testRef = useRef<number>(0);

  useFocusEffect(
    useCallback(() => {
      testRef.current = testRef.current + 1;
      if (testRef.current === 1) {
        setLoading(true);
      }
      setTimeout(() => {
        setText(`Welcome to ${testRef.current}`);
        setLoading(false);
      }, 1000);
    }, [testRef]),
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello</Text>
      {!!text && !loading ? (
        <Text>{text}</Text>
      ) : (
        <ActivityIndicator size={'small'} color={config.color.primary} />
      )}
    </View>
  );
}
