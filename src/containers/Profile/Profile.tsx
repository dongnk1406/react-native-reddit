import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  LayoutAnimation,
  UIManager,
  SafeAreaView,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import StyledTouchable from 'src/components/base/StyledTouchable';
import Modal from 'react-native-modal';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigate, navigationRoutes} from 'src/navigation';
import ImagePicker from 'react-native-image-crop-picker';
import {checkCamera, checkLocation, checkPhoto} from 'src/helper';
import {useTranslation} from 'react-i18next';
import {changeLanguage} from 'src/util/i18n';
import {config, isAndroidPlatform} from 'app-config';
import {Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const modalRef = useRef<Modal>(null);
  const {bottom} = useSafeAreaInsets();
  const {t} = useTranslation();
  const countRef = useRef(0);
  const prevCountRef = useRef(0);
  const offsetScroll = useRef(0);

  const [number, setNumber] = useState<number>(0);
  const [firstBoxPosition, setFirstBoxPosition] = useState('left');
  const [secondBoxPosition, setSecondBoxPosition] = useState('left');
  const [thirdBoxPosition, setThirdBoxPosition] = useState('left');
  const [fourthBoxPosition, setFourthBoxPosition] = useState('left');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [test, setTest] = useState(180);
  const [showTest, setShownTest] = useState(false);

  const toggleFirstBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFirstBoxPosition(firstBoxPosition === 'left' ? 'right' : 'left');
  };

  const toggleSecondBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setSecondBoxPosition(secondBoxPosition === 'left' ? 'right' : 'left');
  };

  const toggleThirdBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setThirdBoxPosition(thirdBoxPosition === 'left' ? 'right' : 'left');
  };

  const toggleFourthBox = () => {
    LayoutAnimation.configureNext({
      duration: 2000,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.5,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    });
    setFourthBoxPosition(fourthBoxPosition === 'left' ? 'right' : 'left');
  };

  useEffect(() => {
    if (isAndroidPlatform && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    if (!showTest) {
      return;
    }

    let timerId = setInterval(() => {
      setTest(prev => prev - 1);
      console.log('countdown');
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [showTest]);

  useEffect(() => {
    prevCountRef.current = number;
  }, [number]);

  // variables
  const snapPoints = useMemo(() => ['50%', '90%'], []);

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
    <SafeAreaView style={{backgroundColor: config.color.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={e => {
          const currentOffset = e.nativeEvent.contentOffset.y;
          const direction =
            currentOffset > offsetScroll.current ? 'down' : 'up';
          offsetScroll.current = currentOffset;
        }}>
        <View style={styles.container}>
          <StyledTouchable onPress={handlePresentModalPress}>
            <Text>Show bottom sheet modal</Text>
          </StyledTouchable>

          <StyledTouchable onPress={() => setIsVisible(true)}>
            <Text>Open Change Avatar</Text>
          </StyledTouchable>

          <StyledTouchable
            onPress={() => {
              navigate(navigationRoutes.WebView, {
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
              changeLanguage('en');
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
              changeLanguage('vn');
            }}>
            <Text>Change language VN</Text>
          </StyledTouchable>
          <Text>{t('another')}</Text>
          <Button
            title="Show test"
            onPress={() => {
              setShownTest(!showTest);
            }}
          />
          {showTest && (
            <Text
              style={{
                backgroundColor: 'orange',
                padding: 8,
                margin: 8,
                textAlign: 'center',
              }}>
              Count down: {test}
            </Text>
          )}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Button
              title="Stop"
              onPress={() => {
                clearInterval(countRef.current);
              }}
            />
            <Text
              style={{
                backgroundColor: 'orange',
                padding: 8,
                margin: 8,
                textAlign: 'center',
              }}>
              Previous: {prevCountRef.current}
            </Text>
            <Text
              style={{
                backgroundColor: 'orange',
                padding: 8,
                margin: 8,
                textAlign: 'center',
              }}>
              Current: {number}
            </Text>
            <Button
              title="Start"
              onPress={() => {
                countRef.current = setInterval(() => {
                  setNumber(prev => prev + 1);
                }, 1000);
              }}
            />
          </View>
        </View>

        <>
          <View style={styles.buttonContainer}>
            <Button title="EaseInEaseOut" onPress={toggleFirstBox} />
          </View>
          <View
            style={[
              styles.box,
              firstBoxPosition === 'left' ? null : styles.moveRight,
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button title="Linear" onPress={toggleSecondBox} />
          </View>
          <View
            style={[
              styles.box,
              secondBoxPosition === 'left' ? null : styles.moveRight,
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button title="Spring" onPress={toggleThirdBox} />
          </View>
          <View
            style={[
              styles.box,
              thirdBoxPosition === 'left' ? null : styles.moveRight,
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button title="Custom" onPress={toggleFourthBox} />
          </View>
          <View
            style={[
              styles.box,
              fourthBoxPosition === 'left' ? null : styles.moveRight,
            ]}
          />
        </>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            backdropComponent={renderBackdrop}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.24,
              shadowRadius: 6,

              elevation: 20,
              backgroundColor: config.color.white,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
            handleIndicatorStyle={{
              backgroundColor: config.color.border,
              borderRadius: 8,
            }}>
            <View style={styles.contentContainer}>
              <Text>Content</Text>
              <StyledTouchable
                onPress={() => {
                  bottomSheetModalRef?.current?.dismiss();
                }}>
                <Text>Dismiss modal now</Text>
              </StyledTouchable>
              <BottomSheetTextInput
                value="Awesome 🎉"
                style={{
                  alignSelf: 'stretch',
                  marginHorizontal: 12,
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: 'grey',
                  color: 'white',
                  textAlign: 'center',
                }}
              />
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
      </ScrollView>
    </SafeAreaView>
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
  box: {
    height: 100,
    width: 100,
    borderRadius: 5,
    margin: 8,
    backgroundColor: 'blue',
  },
  moveRight: {
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    alignSelf: 'center',
  },
});

export default ProfileScreen;
