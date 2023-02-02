import {config} from 'app-config';
import React, {useRef} from 'react';
import {
  PanResponder,
  StyleSheet,
  View,
  Animated,
  TextInput,
  Text,
} from 'react-native';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {Button} from 'react-native-elements';
import * as yup from 'yup';
import {yupValidate} from 'src/helper/validation';

const BOTTOM_SHEET_MAX_HEIGHT = config.layout.windowHeight * 0.6;
const BOTTOM_SHEET_MIN_HEIGHT = config.layout.windowHeight * 0.08;
const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT;
const MAX_DOWNWARD_TRANSLATE_Y = 0;

function SettingScreen() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);

  const yupSchema = yup.object().shape({
    firstName: yupValidate.firstName(),
    lastName: yupValidate.lastName(),
  });

  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    resolver: yupResolver(yupSchema),
    reValidateMode: 'onChange',
    criteriaMode: 'firstError',
  });

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: {errors, isValid},
  } = form;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log(animatedValue);
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gestureState) => {
        animatedValue.setValue(gestureState.dy);
      },
      onPanResponderRelease(e, gestureState) {
        lastGestureDy.current += gestureState.dy;
        if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        }
      },
    }),
  ).current;

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const onSubmit = (data: any) => {
    let bodyFormData = new FormData();
    bodyFormData.append('firstName', data.firstName);
    bodyFormData.append('lastName', data.lastName);
    console.log('bodyFormData', bodyFormData);
    setValue('firstName', 'Hello', {
      shouldValidate: true,
    });
  };

  return (
    <View style={styles.container}>
      <FormProvider {...form}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{
                backgroundColor: 'green',
                padding: 8,
                margin: 8,
                borderRadius: 8,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && <Text>{errors.firstName.message}</Text>}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              style={{
                backgroundColor: 'red',
                padding: 8,
                margin: 8,
                borderRadius: 8,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />
        {errors.lastName && <Text>{errors.lastName.message}</Text>}
      </FormProvider>

      <Button
        disabled={!isValid}
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />

      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.draggableArea} {...panResponder.panHandlers}>
          <View style={styles.dragHandle}></View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...config.color.shadow,
    backgroundColor: config.color.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  draggableArea: {
    alignItems: 'center',
    flexGrow: 1,
  },
  dragHandle: {
    width: 50,
    height: 4,
    marginTop: 10,
    backgroundColor: config.color.border,
    borderRadius: 10,
  },
});

export default SettingScreen;
