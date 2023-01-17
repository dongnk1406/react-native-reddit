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
import {navigate, navigationStrings} from 'src/navigation';
import ImagePicker from 'react-native-image-crop-picker';
import {checkCamera, checkLocation, checkPhoto} from 'src/helper';
import {useTranslation} from 'react-i18next';

const ProfileScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const modalRef = useRef<Modal>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {bottom} = useSafeAreaInsets();
  const {t, i18n} = useTranslation();

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
            navigate(navigationStrings.WebView, {
              uri: 'https://ramdajs.com/docs/',
            });
          }}>
          <Text>Open WebView</Text>
        </StyledTouchable>
        <StyledTouchable
          onPress={async () => {
            await checkLocation();
          }}>
          <Text>Require location</Text>
        </StyledTouchable>
        <StyledTouchable
          style={{
            backgroundColor: 'red',
            marginVertical: 10,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            i18n
              .changeLanguage('en')
              .then(() => console.log('en'))
              .catch(err => console.log(err));
          }}>
          <Text>Change language EN</Text>
        </StyledTouchable>
        <StyledTouchable
          style={{
            backgroundColor: 'red',
            marginVertical: 10,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            i18n
              .changeLanguage('vn')
              .then(() => console.log('vn'))
              .catch(err => console.log(err));
          }}>
          <Text>Change language VN</Text>
        </StyledTouchable>
        <Text>{t('another')}</Text>
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
            paddingBottom: bottom || 20,
            alignItems: 'center',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}>
          <Text>I am the modal content!</Text>
          <StyledTouchable
            style={{paddingVertical: 10}}
            onPress={async () => {
              const response = await checkPhoto();
              if (response) {
                console.log('res', response);
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
              }
            }}>
            <Text>Choose Photo</Text>
          </StyledTouchable>
          <StyledTouchable
            onPress={async () => {
              const response = await checkCamera();
              if (response) {
                ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                }).then(image => {
                  console.log(image);
                  setIsVisible(false);
                });
              }
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
