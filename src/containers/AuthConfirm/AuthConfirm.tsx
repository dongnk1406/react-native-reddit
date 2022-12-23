import React, {useState, useCallback} from 'react';

import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import {users} from 'app-data';
import {config} from 'app-config';
import {InputOtp} from 'src/components';
import {AuthConfirmProps} from '.';
import {signIn} from 'src/store/slices/authSlice';
import {useAppDispatch} from 'src/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setLoading} from 'src/store/slices/commonSlice';

function AuthConfirmScreen({route, navigation}: AuthConfirmProps) {
  const {phone} = route.params;
  const [token, setToken] = useState<string>('');
  const [pinLength, setPinLength] = useState<number>(4);
  const dispatch = useAppDispatch();

  const handleAuthConfirm = useCallback(async () => {
    const foundUser = users.filter(item => {
      return phone == item.userPhone && token == item.userToken;
    });

    if (token.length === 0) {
      Alert.alert(
        'Wrong Input!',
        'Phonenumber or token field cannot be empty.',
        [{text: 'OK'}],
      );
      return;
    }

    if (foundUser.length === 0) {
      Alert.alert('Invalid User!', 'Phonenumber or token is incorrect.', [
        {text: 'OK'},
      ]);
      return;
    }

    const userToken = String(foundUser[0].userToken);
    try {
      dispatch(setLoading(true));
      await AsyncStorage.setItem('user_token', userToken);
      dispatch(signIn(foundUser));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, phone, token]);

  const onChangeCode = useCallback((text: string) => {
    setToken(text);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.containerAvoidingView}>
          <Text style={styles.title}>
            Nhập OTP gửi qua tin nhắn - cuộc gọi tới:{'\n'} {phone}
          </Text>

          <InputOtp pinLength={pinLength} onChangeCode={onChangeCode} />

          <View style={styles.button}>
            <TouchableOpacity
              onPress={handleAuthConfirm}
              activeOpacity={config.layout.activeOpacity}
              style={{paddingVertical: 20}}>
              <Text style={styles.textButton}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button title="Yêu cầu mã mới" onPress={() => {}} />
            <Button
              title="Thay đổi số đăng nhập"
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.white,
  },
  containerAvoidingView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 16,
    lineHeight: 32,
    color: config.color.typography.text,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    color: config.color.typography.text,
  },
});

export default AuthConfirmScreen;
