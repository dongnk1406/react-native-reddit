import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ProfileProps} from '.';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}: ProfileProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
        pressBehavior={'close'}
      />
    ),
    [],
  );

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePresentModalPress}>
          <Text>Show modal</Text>
        </TouchableOpacity>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current?.dismiss();
              }}>
              <Text>Dismiss modal</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ProfileScreen;
