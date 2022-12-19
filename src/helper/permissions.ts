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
import ModalConfirm from 'src/components/common/ModalConfirm';

export const checkCamera = async (modal: any) => {
  try {
    const checkPermission = await check(
      isIOSPlatform ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      ModalConfirm({
        modal,
        title: 'permissions.camera.title',
        content: 'permissions.camera.content',
        textConfirm: 'common.settings',
        textCancel: 'common.no',
        onConfirm: () => {
          openSettings().catch(() => console.log('cannot open settings'));
        },
      });
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOSPlatform ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
      );
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable('camera');
      return false;
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const checkPhoto = async (modal: any) => {
  try {
    const checkPermission = await check(
      isIOSPlatform
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    );
    if (checkPermission === RESULTS.BLOCKED) {
      ModalConfirm({
        modal,
        title: 'permissions.photo.title',
        content: 'permissions.photo.content',
        textConfirm: 'common.settings',
        textCancel: 'common.no',
        onConfirm: () => {
          openSettings().catch(() => console.log('cannot open settings'));
        },
      });
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOSPlatform
          ? PERMISSIONS.IOS.PHOTO_LIBRARY
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable('photo');
      return false;
    }
    return true;
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
      showRequestPermission('audio');
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
      showPermissionUnavailable('audio');
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
      showRequestPermission('location');
      return false;
    }
    if (checkPermission === RESULTS.DENIED) {
      const result = await request(
        isIOSPlatform
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      return result === RESULTS.GRANTED;
    }
    if (checkPermission === RESULTS.UNAVAILABLE) {
      showPermissionUnavailable('location');
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

const messages: any = {
  camera: i18next.t('permissions.camera'),
  photo: i18next.t('permissions.photo'),
  audio: i18next.t('permissions.audio'),
};

const showRequestPermission = (type: string) => {
  Alert.alert(
    Config.APP_NAME,
    messages[type],
    [
      {
        text: i18next.t('common.cancel'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'default',
      },
      {
        text: i18next.t('common.confirm'),
        onPress: () =>
          openSettings().catch(() => console.log('cannot open settings', true)),
      },
    ],
    {cancelable: false},
  );
};

const messagesUnavailable: any = {
  camera: i18next.t('permissions.camera.title'),
  photo: i18next.t('permissions.photo.title'),
  audio: i18next.t('permissions.audio.title'),
  location: i18next.t('permissions.location.title'),
};

const showPermissionUnavailable = (type: string) => {
  Alert.alert(Config.APP_NAME, messagesUnavailable[type]);
};
