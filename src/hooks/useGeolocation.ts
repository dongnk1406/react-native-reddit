import {isIOSPlatform} from 'app-config';
import {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export const useGeolocation = () => {
  const [error, setError] = useState('');
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (isIOSPlatform || IsAndroidPermissionAllowed()) {
      if (isIOSPlatform) {
        Geolocation.requestAuthorization();
      }
      getCurrentPosition();
    }
    return;
  }, []);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setError('');
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      e => {
        setError(e.message);
        console.log('error internal', e);
      },
    );
  };

  return [error, position, getCurrentPosition];
};

const IsAndroidPermissionAllowed = () => {
  return androidRequestLocationPermission();
};

const androidRequestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'DASH',
        message:
          'MyCat require you to enable permission to access location for its usability',
      },
    );
    console.log('granted', granted);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return true;
    } else {
      console.log('location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};
