import {isIOSPlatform} from 'app-config';
import i18next from 'i18next';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {
  check,
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';

enum EPermission {
  PHOTO = 'photo',
  CAMERA = 'camera',
  LOCATION = 'location',
  AUDIO = 'audio',
}

export const checkCamera = async () => {
  const requestPermission = isIOSPlatform
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;
  try {
    const checkPermission = await check(requestPermission);
    switch (checkPermission) {
      case RESULTS.BLOCKED:
        showRequestPermission(EPermission.CAMERA);
        return false;
      case RESULTS.DENIED:
        const result = await request(requestPermission);
        if (result === RESULTS.BLOCKED) {
          showRequestPermission(EPermission.CAMERA);
        }
        return result === RESULTS.GRANTED;
      case RESULTS.UNAVAILABLE:
        showPermissionUnavailable(EPermission.CAMERA);
        return false;
      default:
        return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkPhoto = async () => {
  const requestPermission = isIOSPlatform
    ? PERMISSIONS.IOS.PHOTO_LIBRARY
    : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  try {
    const checkPermission = await check(requestPermission);
    switch (checkPermission) {
      case RESULTS.BLOCKED:
        showRequestPermission(EPermission.PHOTO);
        return false;
      case RESULTS.DENIED:
        const result = await request(requestPermission);
        if (result === RESULTS.BLOCKED) {
          showRequestPermission(EPermission.PHOTO);
        }
        return result === RESULTS.GRANTED;
      case RESULTS.UNAVAILABLE:
        showPermissionUnavailable(EPermission.PHOTO);
        return false;
      default:
        return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkAudio = async () => {
  try {
    const checkPermission = await check(
      isIOSPlatform
        ? PERMISSIONS.IOS.MICROPHONE
        : PERMISSIONS.ANDROID.RECORD_AUDIO,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      showRequestPermission(EPermission.AUDIO);
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOSPlatform
          ? PERMISSIONS.IOS.MICROPHONE
          : PERMISSIONS.ANDROID.RECORD_AUDIO,
      );
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable(EPermission.AUDIO);
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkLocation = async () => {
  try {
    const checkPermission = await check(
      isIOSPlatform
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      showRequestPermission(EPermission.LOCATION);
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOSPlatform
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (result === RESULTS.BLOCKED) {
        showRequestPermission(EPermission.LOCATION);
      }
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable(EPermission.LOCATION);
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

const showRequestPermission = (type: EPermission) => {
  const messages: any = {
    camera: i18next.t('permissions.camera', {appName: Config.APP_NAME}),
    photo: i18next.t('permissions.photo', {appName: Config.APP_NAME}),
    audio: i18next.t('permissions.audio', {appName: Config.APP_NAME}),
    location: i18next.t('permissions.location', {appName: Config.APP_NAME}),
  };

  Alert.alert(
    `${i18next.t('permissions.requestAccess', {
      appName: Config.APP_NAME,
      permissionType: type,
    })}`,
    `${i18next.t('permissions.requestMessage', {
      appName: Config.APP_NAME,
      permissionType: type,
    })}`,
    [
      {
        text: `${i18next.t('common.cancel')}`,
        style: 'default',
      },
      {
        text: `${i18next.t('common.goToSetting')}`,
        onPress: () =>
          openSettings().catch(() => console.log('cannot open settings', true)),
      },
    ],
    {cancelable: false},
  );
};

const showPermissionUnavailable = (type: EPermission) => {
  Alert.alert(
    String(Config.APP_NAME),
    `${i18next.t('permissions.unavailable', {permissionType: type})}`,
  );
};
