import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
  directionRow: {
    flexDirection: 'row',
  },
  directionColumm: {
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
    backgroundColor: theme.colors.mainBackground,
    flex: 1,
    flexGrow: 1,
  },
  SafeAreaViewStyle: {
    height: Device.height,
    backgroundColor: theme.colors.headerBackground,
    flex: 1,
  },
  pageContainerStyle: {
    backgroundColor: theme.colors.mainBackground,
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
