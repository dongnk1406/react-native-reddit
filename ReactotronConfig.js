import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';
import {NativeModules} from 'react-native';

let hostname = 'localhost';
if (__DEV__) {
  const {scriptURL} = NativeModules.SourceCode;
  hostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotronConfig = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: 'MyCat',
    host: hostname,
  })
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/,
    },
  })
  .use(reactotronRedux())
  .connect();

// default port tcp:8081 tcp:8081
// using reactotron on Android device:
// adb reverse tcp:9090 tcp:9090
// adb reverse --list

export default reactotronConfig;
