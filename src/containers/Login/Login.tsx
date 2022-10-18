import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CountryPicker, {CountryCode} from 'react-native-country-picker-modal';
import {navigationStrings} from 'src/navigation';
import {config, isAndroidPlatform, isIOSPlatform, isIphoneX} from 'app-config';
import {LoginProps} from '.';

const LoginScreen = ({navigation}: LoginProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<CountryCode>('VN');
  const [callingCode, setCallingCode] = useState<string>('84');

  const handleShowPolicy = useCallback(() => {}, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Image
              source={require('src/assets/images/logo.jpg')}
              style={styles.logo}
            />
            <View style={{marginTop: 10}}>
              <Text style={styles.title}>Xin chào!</Text>
              <Text style={styles.description}>
                Nhập số điện thoại để tiếp tục
              </Text>
            </View>
          </View>

          <View style={styles.phonePickerContainer}>
            <CountryPicker
              withFilter
              countryCode={countryCode}
              withAlphaFilter
              withCallingCode
              withCallingCodeButton
              containerButtonStyle={styles.phonePickerBlock}
              onSelect={country => {
                setCountryCode(country.cca2);
                setCallingCode(country.callingCode[0]);
              }}
            />

            <TextInput
              autoFocus
              placeholder="8765 4321"
              style={styles.phoneInput}
              onChangeText={value => setPhoneNumber(value)}
              value={phoneNumber}
              keyboardType={isIOSPlatform ? 'number-pad' : 'numeric'}
              maxLength={10}
            />
          </View>

          <View style={styles.button}>
            <TouchableOpacity
              activeOpacity={config.layout.activeOpacity}
              onPress={() =>
                phoneNumber &&
                navigation.navigate(navigationStrings.AUTH_CONFIRM, {
                  phone: phoneNumber,
                })
              }>
              <Text style={styles.textButton}>Tiếp tục</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.policyBlock}>
        <TouchableOpacity
          style={styles.policyButton}
          onPress={handleShowPolicy}
          activeOpacity={config.layout.activeOpacity}>
          <Text style={styles.policyTitle}>Thoả thuận người dùng (EULA)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.white,
  },
  content: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginVertical: 10,
    color: config.color.typography.text,
  },
  description: {
    fontSize: 16,
    fontWeight: '200',
    color: config.color.typography.text,
  },
  phonePickerContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  phonePickerBlock: {
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: config.color.placeholder,
    paddingHorizontal: 8,
  },
  phoneCallingCode: {
    fontSize: 20,
  },
  phoneInput: {
    fontSize: 28,
    marginLeft: 12,
    fontWeight: '800',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    flex: 1,
    backgroundColor: config.color.placeholder,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    color: config.color.typography.text,
  },
  policyBlock: {
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    marginTop:
      config.layout.windowHeight -
      30 -
      (isAndroidPlatform ? 90 : isIphoneX ? 40 : 20),
  },
  policyButton: {},
  policyTitle: {
    fontSize: 14,
    color: config.color.typography.text,
  },
});

export default LoginScreen;
