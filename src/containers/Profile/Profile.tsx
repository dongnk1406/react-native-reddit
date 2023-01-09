import React, {useCallback, useMemo, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import StyledTouchable from 'src/components/base/StyledTouchable';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigationStrings} from 'src/navigation';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const modalRef = useRef<Modal>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {bottom} = useSafeAreaInsets();

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
      <BottomSheetBackdrop {...props} pressBehavior={'close'} />
    ),
    [],
  );

  // renders
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <StyledTouchable onPress={handlePresentModalPress}>
          <Text>Show modal</Text>
        </StyledTouchable>

        <StyledTouchable onPress={() => setIsVisible(true)}>
          <Text>Open Change Avatar</Text>
        </StyledTouchable>

        <StyledTouchable
          onPress={() => {
            navigation.navigate(navigationStrings.WebView, {
              uri: 'https://ramdajs.com/docs/',
            });
          }}>
          <Text>Open WebView</Text>
        </StyledTouchable>
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}>
        <View style={styles.contentContainer}>
          <Text>Content</Text>
          <StyledTouchable
            onPress={() => {
              bottomSheetModalRef?.current?.dismiss();
            }}>
            <Text>Dismiss modal</Text>
          </StyledTouchable>
        </View>
      </BottomSheetModal>
      <Modal
        ref={modalRef}
        style={{justifyContent: 'flex-end', margin: 0}}
        isVisible={isVisible}
        backdropColor={'#000'}
        backdropOpacity={0.4}
        onBackdropPress={() => setIsVisible(false)}>
        <View
          style={{
            backgroundColor: 'white',
            paddingBottom: bottom,
            alignItems: 'center',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          <Text>I am the modal content!</Text>
          <StyledTouchable
            style={{paddingVertical: 10}}
            onPress={() => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              })
                .then(image => {
                  console.log('image', image);
                  setIsVisible(false);
                })
                .catch(err => console.log('Error', err));
            }}>
            <Text>Choose Photo</Text>
          </StyledTouchable>
          <StyledTouchable
            onPress={() => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              }).then(image => {
                console.log(image);
                setIsVisible(false);
              });
            }}>
            <Text>Take Photo</Text>
          </StyledTouchable>
          <StyledTouchable
            onPress={() => {
              setIsVisible(false);
            }}>
            <Text>Cancel</Text>
          </StyledTouchable>
        </View>
      </Modal>
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
  },
});

export default ProfileScreen;
