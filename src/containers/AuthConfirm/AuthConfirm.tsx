import React, {useEffect, useContext, useState, useCallback} from 'react';

import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {users} from 'app-data';
import {config} from 'app-config';
import {AuthContext} from 'src/theme/context';
import {InputOtp} from 'src/components';
import {AuthConfirmProps} from '.';

function AuthConfirmScreen({route, navigation}: AuthConfirmProps) {
  const {phone} = route.params;
  const [token, setToken] = useState<string>('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [pinLength, setPinLength] = useState<number>(4);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    console.log(user);
  }

  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      Alert.alert('success');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  const handleAuthConfirm = useCallback(() => {
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

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Phonenumber or token is incorrect.', [
        {text: 'OK'},
      ]);
      return;
    }
    signIn(foundUser);
  }, [token]);

  const {signIn} = useContext(AuthContext);

  // if (!confirm) {
  //   return (
  //     <Button
  //       title="Phone Number Sign In"
  //       onPress={() => signInWithPhoneNumber('84 374763389')}
  //     />
  //   );
  // }

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

function checkPhone() {
  // If null, no SMS has been sent

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function onAuthStateChanged(user) {
    console.log(user);
  }

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
      Alert.alert('success');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('84 374763389')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}
