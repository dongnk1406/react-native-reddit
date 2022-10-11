import React, {useEffect, useState, useCallback, memo, useRef} from 'react';
import {
  ActivityIndicator,
  Button,
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {get} from 'app-util';
import {config} from 'app-config';
import Friend from './Friend';
import {ListFriendProps} from '.';

const ListFriendScreen = ({}: ListFriendProps) => {
  const [data, setData] = useState<Array<undefined>>([]);
  const [page, setPage] = useState<number>(1);
  const [isReFreshing, setReFreshing] = useState<boolean>(false);
  const [isEndOfData, setEndOfData] = useState<boolean>(false);
  const [isFetching, setFetching] = useState<boolean>(true);
  const [isEndReached, setEndReached] = useState<boolean>(false);
  const [contentVerticalOffset] = useState<number>(0);
  const [animatedScrollYValue] = useState(new Animated.Value(0));
  const refFlatList = useRef(undefined);
  const abortController = new AbortController();

  useEffect(() => {
    fetchData();
    return () => {
      abortController.abort();
    };
  }, [page]);

  const fetchData = useCallback(async () => {
    try {
      setFetching(true);
      const data = await get(`/list-friend?page=${page}&limit=20`, {
        signal: abortController.signal,
      });

      if (!data.length) {
        setEndOfData(true);
        setFetching(false);
        return;
      }

      isReFreshing ? setData(data) : setData(prev => prev.concat(data));
      setFetching(false);
      setEndOfData(false);
      setReFreshing(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [page, isReFreshing]);

  const renderItem = useCallback(({item, index}) => {
    const ITEM_SIZE = 90;

    const scaleAnimationValue = animatedScrollYValue.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });

    const opacityAnimationValue = animatedScrollYValue.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)],
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Friend
        data={item}
        scale={scaleAnimationValue}
        opacity={opacityAnimationValue}
      />
    );
  }, []);

  const handleScrollToTop = useCallback(() => {
    refFlatList.current.scrollToIndex({index: 0});
  }, [refFlatList]);

  const handleRenderFooter = useCallback(() => {
    return isEndReached && isFetching ? (
      <ActivityIndicator size="small" color={config.color.primary} />
    ) : null;
  }, [isEndReached, isFetching]);

  const handleEndReached = useCallback(() => {
    setEndReached(true);
    if (isEndOfData) {
      return;
    }
    setPage(prev => prev + 1);
  }, [isEndOfData]);

  const handleRefresh = useCallback(() => {
    const firstPage = 1;
    if (page === firstPage) {
      return;
    }

    setReFreshing(true);
    setPage(firstPage);
  }, [page]);

  if (!isEndReached && isFetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="small" color={config.color.primary} />
      </View>
    );
  }

  return (
    <>
      <Animated.FlatList
        ref={refFlatList}
        data={data}
        extraData={isFetching}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(item?.id || index)}
        refreshing={isReFreshing}
        ListFooterComponent={handleRenderFooter}
        ListEmptyComponent={() => {
          return <Text>Empty</Text>;
        }}
        onEndReachedThreshold={0.6}
        onEndReached={handleEndReached}
        onRefresh={handleRefresh}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: animatedScrollYValue},
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}
      />
      {contentVerticalOffset > 100 && (
        <TouchableOpacity
          activeOpacity={config.layout.activeOpacity}
          style={{
            position: 'absolute',
            width: 50,
            height: 50,
            borderRadius: 50 / 2,
            backgroundColor: '#ecedf0',
            alignItems: 'center',
            justifyContent: 'center',
            right: 30,
            bottom: 30,
          }}
          onPress={handleScrollToTop}>
          <AntDesign name="up" color={config.color.primary} size={20} />
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(ListFriendScreen);
