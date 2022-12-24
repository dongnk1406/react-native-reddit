import React, {useCallback, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {Button, ScrollView, Text, TextInput, View} from 'react-native';
import {BaseButton} from 'src/components';
import {useAppDispatch, useAppSelector} from 'src/hooks';
import {config} from 'app-config';
import {RootState} from 'src/store';
import {
  addCustomer,
  addUserThunk,
  fetchUserThunk,
} from 'src/store/slices/customerSlice';
import {
  addReservation,
  removeReservation,
} from 'src/store/slices/reservationSlice';
import {PopularProps} from '.';
import {useFocusEffect} from '@react-navigation/native';

function Popular({navigation}: PopularProps) {
  const reservations = useAppSelector(
    (state: RootState) => state.reservation.value,
  );
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState<string>('');

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <TextInput
          value={inputText}
          placeholder="Type ..."
          style={{
            backgroundColor: 'orange',
            padding: 10,
            borderRadius: 5,
            marginHorizontal: 20,
            marginVertical: 10,
          }}
          onChangeText={text => setInputText(text)}
        />
        {reservations.map((reservation, index) => {
          return (
            <View
              key={index}
              style={{
                margin: 5,
                borderWidth: 1,
                borderColor: config.color.border,
              }}>
              <Text>
                {reservation} {index}
              </Text>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Button
                  title="Add"
                  onPress={() => {
                    dispatch(
                      addCustomer({
                        id: uuidv4(),
                        name: '',
                        food: ['', ''],
                      }),
                    );
                  }}
                />
                <Button
                  title="Del"
                  onPress={() => {
                    dispatch(removeReservation(index));
                  }}
                />
              </View>
            </View>
          );
        })}
        <BaseButton
          label="Add"
          onPress={() => {
            dispatch(addReservation(inputText));
            setInputText('');
          }}
        />
      </View>
    </ScrollView>
  );
}

export default Popular;
