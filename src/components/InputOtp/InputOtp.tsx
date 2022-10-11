import React, {memo, useCallback, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import {config, isIOSPlatform} from 'app-config';
import {InputOtpProps} from '.';

const styles = StyleSheet.create({
  inputOtp: {
    position: 'absolute',
    opacity: 0,
  },
  cellsOtpBlock: {
    flexDirection: 'row',
  },
  cellOtp: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 8,
    marginVertical: 20,
  },
  pasteButtonWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  pasteButtonContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  pasteButton: {
    borderRadius: 6,
    backgroundColor: config.color.placeholder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
  },
  triangle: {
    position: 'absolute',
    bottom: '-40%',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: config.color.placeholder,
  },
  pin: {
    fontSize: 28,
    fontWeight: 'bold',
    minHeight: 30,
    color: config.color.typography.text,
  },
});

const InputOtp = ({
  pinLength = 0,
  pasteable = true,
  onChangeCode,
  onSubmitEditing,
}: InputOtpProps) => {
  const refInputContainer = useRef<View>(null);
  const refCodeInput = useRef<TextInput>(null);

  const [codeInput, setCodeInput] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isShowPasteButton, setShowPasteButton] = useState<boolean>(false);
  const [inputContainerLayout, setInputContainerLayout] = useState({
    x: 0,
    y: 0,
  });

  const handleChangeInput = useCallback(
    (text: string) => {
      const newText = text.trim();

      if (newText && Number(newText) !== 0 && !Number(newText)) {
        return;
      }

      onChangeCode(newText);

      setCurrentIndex(newText.length);
      setCodeInput(newText);
      setShowPasteButton(false);
    },
    [onChangeCode],
  );

  const onPasteCode = useCallback(async () => {
    setShowPasteButton(false);

    const text = (await Clipboard.getString()).trim();

    if (!text) {
      return;
    }

    if (refCodeInput.current) {
      refCodeInput.current.blur();
      refCodeInput.current.clear();
    }

    handleChangeInput(text);
  }, [handleChangeInput]);

  const onFocusInput = useCallback(() => {
    if (refCodeInput.current) {
      refCodeInput.current.focus();
    }
  }, []);

  const onLongPressInput = useCallback(() => {
    if (!pasteable) {
      return;
    }

    if (refInputContainer.current) {
      refInputContainer.current?.measure((x, y, width, height, px, py) => {
        // setInputContainerLayout({x: px, y: py});
      });
    }
    setShowPasteButton(true);
  }, [pasteable]);

  const renderUnderlinesInput = useCallback(() => {
    const pins = Array.from({length: Number(pinLength)});

    return (
      <View style={styles.cellsOtpBlock}>
        {pins.map((_, i) => {
          const activeOtpStyle =
            currentIndex === i
              ? {borderColor: config.color.primary}
              : {borderColor: config.color.border};
          return (
            <View key={i} style={[styles.cellOtp, activeOtpStyle]}>
              <Text style={styles.pin}>
                {codeInput && codeInput.length > 0 ? codeInput[i] : ''}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }, [currentIndex, codeInput, pinLength]);

  return (
    <View>
      <View ref={refInputContainer}>
        <TextInput
          ref={refCodeInput}
          autoFocus
          onChangeText={handleChangeInput}
          maxLength={pinLength}
          value={codeInput}
          keyboardType={isIOSPlatform ? 'number-pad' : 'numeric'}
          style={styles.inputOtp}
          onSubmitEditing={onSubmitEditing}
          textContentType="oneTimeCode"
        />
        <TouchableWithoutFeedback
          onPress={onFocusInput}
          onLongPress={onLongPressInput}>
          {renderUnderlinesInput()}
        </TouchableWithoutFeedback>
      </View>

      <Modal visible={isShowPasteButton} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={() => setShowPasteButton(false)}>
          <View style={styles.pasteButtonWrapper}>
            <View
              style={[
                styles.pasteButtonContainer,
                {
                  top: '15%',
                },
              ]}>
              <TouchableOpacity
                onPress={onPasteCode}
                activeOpacity={config.layout.activeOpacity}
                style={styles.pasteButton}>
                <Text style={{color: config.color.typography.text}}>Paste</Text>
                <View style={styles.triangle} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default memo(InputOtp);
