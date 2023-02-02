import {config} from 'app-config';
import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },
  directionColumn: {
    flexDirection: 'column',
  },
  flex0: {
    flex: 0,
  },
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  fullContainer: {
    backgroundColor: config.color.background,
    flex: 1,
    flexGrow: 1,
  },
  SafeAreaViewStyle: {
    height: config.layout.windowHeight,
    backgroundColor: config.color.headerBackground,
    flex: 1,
  },
  pageContainerStyle: {
    backgroundColor: config.color.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    flex: 1,
    flexGrow: 1,
  },
});
