import React, {useState, useCallback, useRef, memo, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {navigationStrings} from 'src/navigation';
import {config} from 'app-config';
const width = Dimensions.get('window').width;
import {onBoardingSlide} from 'app-data';
import Description from './Description';
import {BaseButton} from 'src/components';
import { OnBoardingProps } from '.';

const OnBoardingScreen = ({navigation}: OnBoardingProps) => {
  const [animatedScrollXValue] = useState(new Animated.Value(0));
  const [animatedTranslateYValue] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  useEffect(() => {
    Animated.timing(animatedTranslateYValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const renderItem = useCallback(({item} : any) => {
    return (
      <View style={styles.slideWrapper}>
        <Image source={{uri: item.url}} style={styles.image} />
      </View>
    );
  }, []);

  const renderPagination = useCallback(() => {
    if (onBoardingSlide.length < 2) return;

    return (
      <View style={styles.paginationWrapper}>
        <StatusBar hidden />
        {onBoardingSlide.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          return (
            <Animated.View
              key={i}
              style={[
                styles.dotPagination,
                {
                  transform: [
                    {
                      scale: animatedScrollXValue.interpolate({
                        inputRange,
                        outputRange: [1, 1.5, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                },
                {
                  opacity: animatedScrollXValue.interpolate({
                    inputRange,
                    outputRange: [0.5, 1, 0.5],
                    extrapolate: 'clamp',
                  }),
                },
              ]}></Animated.View>
          );
        })}
      </View>
    );
  }, []);

  const renderConfirmButton = useCallback(() => {
    return onBoardingSlide.length < 2 ? (
      <BaseButton
        label="Start"
        onPress={() => navigation.replace(navigationStrings.LOGIN)}
      />
    ) : (
      <View style={styles.buttonContent}>
        {renderPagination()}
        <TouchableOpacity
          activeOpacity={config.layout.activeOpacity}
          style={styles.buttonBackground}
          onPress={() => navigation.replace(navigationStrings.LOGIN)}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const onViewableItemsChanged = useCallback(({viewableItems}) => {
    if (viewableItems.length >= 1) {
      if (viewableItems[0].isViewable) {
        setCurrentIndex(viewableItems[0].index);
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Animated.FlatList
          horizontal
          data={onBoardingSlide}
          pagingEnabled
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          viewabilityConfig={viewConfigRef.current}
          onViewableItemsChanged={onViewableItemsChanged}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {x: animatedScrollXValue},
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
      </View>

      <Animated.View
        style={[
          styles.descriptionBlock,
          {
            transform: [
              {
                translateY: animatedTranslateYValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [(config.layout.windowHeight * 40) / 100, 0],
                }),
              },
            ],
            opacity: animatedTranslateYValue,
          },
        ]}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {onBoardingSlide.map((item, i) => {
            return currentIndex === i ? (
              <Description key={i} data={item} />
            ) : null;
          })}
        </View>
        <SafeAreaView style={styles.buttonBlock}>
          {renderConfirmButton()}
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideWrapper: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  paginationWrapper: {
    flexDirection: 'row',
  },
  dotPagination: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: config.color.primary,
  },
  descriptionBlock: {
    position: 'absolute',
    backgroundColor: config.color.white,
    bottom: 0,
    height: '40%',
    width: '100%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 20,
  },
  buttonBlock: {
    width: '100%',
    marginBottom: 24,
  },
  buttonContent: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonBackground: {
    backgroundColor: config.color.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    ...config.color.shadow,
  },
  buttonText: {
    color: config.color.white,
    fontSize: 16,
    fontWeight: '600',
  },
  paginationBarWrapper: {
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  paginationBarContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  paginationHighlightBar: {
    flexDirection: 'row',
    position: 'absolute',
  },
  highlightDotBar: {
    position: 'absolute',
    left: 0,
  },
});

export default memo(OnBoardingScreen);
