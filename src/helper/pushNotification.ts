import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export const getFCMToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcm_token');
  if (!fcmToken) {
    try {
      await messaging().registerDeviceForRemoteMessages();
      let token = await messaging().getToken();
      if (!token) return;
      await AsyncStorage.setItem('fcm_token', token);
      return token;
    } catch (error) {
      console.log('Error', error);
    }
  }
  return fcmToken
};

export const notificationHandler = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('Message remote', remoteMessage);
  });
};
