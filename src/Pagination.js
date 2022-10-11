import React, {Component} from 'react';
import {StyleSheet, View, Animated, Image, Dimensions} from 'react-native';

const DATA = [
  'https://is1-ssl.mzstatic.com/image/thumb/puqwaQaEOwgw09hN-xpwCw/1200x675mf.jpg',
  'https://znews-photo.zingcdn.me/w660/Uploaded/xbhunku/2016_06_20/2421_MOW_00015R.jpg',
  'https://znews-photo.zingcdn.me/w660/Uploaded/vnaits/2022_06_27/fid20178_trid20431.jpg',
  'https://image.thanhnien.vn/w1024/Uploaded/2022/juzagt/2022_07_04/1-7418.jpg',
  'https://asset.kompas.com/crops/oUprh6SJu9XQre4FMiWqJdSt__M=/0x0:780x390/750x500/data/photo/2015/06/17/1841065minions05780x390.jpg',
];

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
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

class Pagination extends Component {
  animatedScroll = new Animated.Value(0);

  state = {
    data: DATA,
  };

  get screenDimensions() {
    return Dimensions.get('screen');
  }

  renderPagination = () => {
    const dotWidth = 10;
    const dotHeight = 5;
    const dotRadius = dotHeight / 2;
    const dotSpacing = 30;
    const activeDotScaleX = 2.5;

    let inputRange = [],
      outputRange = [],
      barTranslateXOutputRange = [],
      barScaleXOutputRange = [],
      leftHighlightDotTranslateXOutputRange = [],
      rightHighlightDotTranslateXOutputRange = [];

    const dotColor = 'red';

    this.state.data.map((_, i) => {
      if (i === 0) {
        inputRange.push(0);
        outputRange.push(1);
        barTranslateXOutputRange.push(0);
        barScaleXOutputRange.push(0);
        leftHighlightDotTranslateXOutputRange.push(0);
        rightHighlightDotTranslateXOutputRange.push(0);
      }

      if (i >= this.state.data.length - 1) {
        return;
      }

      inputRange.push((i + 0.5) * this.screenDimensions.width);
      outputRange.push(2);
      barTranslateXOutputRange.push((i + 0.5) * (dotWidth + dotSpacing));
      barScaleXOutputRange.push((dotWidth + dotSpacing) / dotWidth);
      leftHighlightDotTranslateXOutputRange.push(i * (dotWidth + dotSpacing));
      rightHighlightDotTranslateXOutputRange.push((i + 1) * (dotWidth + dotSpacing));

      inputRange.push((i + 1) * this.screenDimensions.width);
      outputRange.push(1);
      barTranslateXOutputRange.push((i + 1) * (dotWidth + dotSpacing));
      barScaleXOutputRange.push(0);
      leftHighlightDotTranslateXOutputRange.push(
        (i + 1) * (dotWidth + dotSpacing),
      );
      rightHighlightDotTranslateXOutputRange.push((i + 1) * (dotWidth + dotSpacing));
    });

    return (
      <View style={styles.paginationBarWrapper}>
        <View style={styles.paginationBarContainer}>
          {this.state.data.map((_, i) => {
            return (
              <Animated.View
              key={i}
                style={{
                  width: dotWidth,
                  height: dotHeight,
                  borderRadius: dotRadius,
                  marginRight: i <= this.state.data.length - 1 ? dotSpacing : 0,
                  backgroundColor: dotColor,
                  // opacity: this.animatedScroll.interpolate({
                  //   inputRange: [
                  //     (i - 1) * this.screenDimensions.width,
                  //     i * this.screenDimensions.width,
                  //     (i + 1) * this.screenDimensions.width,
                  //   ],
                  //   outputRange: [.3, 1, .3],
                  //   extrapolate: 'clamp',
                  // }),
                  transform: [
                    {
                      scaleX: this.animatedScroll.interpolate({
                        inputRange: [
                          (i - 1) * this.screenDimensions.width,
                          i * this.screenDimensions.width,
                          (i + 1) * this.screenDimensions.width,
                        ],
                        outputRange: [1, activeDotScaleX, 1],
                        extrapolate: 'clamp',
                      }),
                    },
                  ],
                }}
              />
            );
          })}
          <Animated.View style={styles.paginationHighlightBar}>
            <Animated.View
              style={{
                width: dotWidth,
                height: dotHeight,
                backgroundColor: dotColor,
                transform: [
                  {
                    translateX: this.animatedScroll.interpolate({
                      inputRange,
                      outputRange: barTranslateXOutputRange,
                      extrapolate: 'clamp',
                    }),
                  },
                  {
                    scaleX: this.animatedScroll.interpolate({
                      inputRange,
                      outputRange: barScaleXOutputRange,
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              }}
            />
            <Animated.View
              style={[
                styles.highlightDotBar,
                {
                  width: dotWidth,
                  height: dotHeight,
                  borderRadius: dotRadius,
                  backgroundColor: dotColor,
                  transform: [
                    {
                      translateX: this.animatedScroll.interpolate({
                        inputRange,
                        outputRange: leftHighlightDotTranslateXOutputRange,
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      scaleX: activeDotScaleX,
                    },
                  ],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.highlightDotBar,
                {
                  width: dotWidth,
                  height: dotHeight,

                  borderRadius: dotRadius,
                  backgroundColor: dotColor,
                  transform: [
                    {
                      translateX: this.animatedScroll.interpolate({
                        inputRange,
                        outputRange: rightHighlightDotTranslateXOutputRange,
                        extrapolate: 'clamp',
                      }),
                    },
                    {
                      scaleX: activeDotScaleX,
                    },
                  ],
                },
              ]}
            />
          </Animated.View>
        </View>
      </View>
    );
  };

  renderItem = ({item: url, index}) => {
    return (
      <View
        style={{
          width: this.screenDimensions.width,
          height: this.screenDimensions.width,
        }}>
        <Image style={styles.image} source={{uri: url}} />
      </View>
    );
  };

  eventHandler = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            x: this.animatedScroll,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );

  render() {
    return (
      <>
        <Animated.FlatList
          horizontal
          data={this.state.data}
          decelerationRate="fast"
          snapToInterval={this.screenDimensions.width}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this.eventHandler}
          renderItem={this.renderItem}
          keyExtractor={(_, i) => i.toString()}
        />
        {this.renderPagination()}
      </>
    );
  }
}

export default Pagination;
