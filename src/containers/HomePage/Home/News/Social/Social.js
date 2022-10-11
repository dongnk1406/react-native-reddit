import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Button,
  View,
  StyleSheet,
} from 'react-native';
import { get } from 'app-util';
import {config} from 'app-config';
import Post from './Post';

const Social = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [mode, setMode] = useState('auto');
  const [isReFreshing, setReFreshing] = useState(false);
  const [isEndOfData, setEndOfData] = useState(false);
  const [isFetching, setFetching] = useState(true);
  const [isEndReached, setEndReached] = useState(false);
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
      const data = await get(`?page=${page}&limit=20`, {
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

  const renderItem = useCallback(({item}) => {
    return <Post data={item} />;
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const handleRenderFooter = useCallback(() => {
    return isEndReached && isFetching ? (
      <ActivityIndicator size="small" color={config.color.primary} />
    ) : isEndReached && mode === 'manual' && !isEndOfData ? (
      <View style={{paddingTop: 5}}>
        <Button
          title="Load more"
          color={config.color.primary}
          onPress={handleLoadMore}
        />
      </View>
    ) : null;
  }, [isEndReached, isFetching, isEndOfData]);

  const handleEndReached = useCallback(() => {
    setEndReached(true);
    if (mode !== 'auto') {
      return;
    } else if (isEndOfData) {
      return;
    }

    setPage(prev => prev + 1);
  }, [isEndOfData, mode]);

  const handleRefresh = useCallback(() => {
    const firstPage = 1;
    if (page === firstPage) {
      return;
    }
    setReFreshing(true);
    setPage(firstPage);
  }, [page]);

  return (
    <View style={styles.container}>
      {!isEndReached && isFetching && (
        <ActivityIndicator
          size="small"
          color={config.color.primary}
          style={styles.loading}
        />
      )}

      <FlatList
        data={data}
        extraData={isFetching}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(item.id || index)}
        refreshing={isReFreshing}
        onRefresh={handleRefresh}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        ListFooterComponent={handleRenderFooter}
        ListEmptyComponent={() => {
          return <></>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
});

export default memo(Social);
