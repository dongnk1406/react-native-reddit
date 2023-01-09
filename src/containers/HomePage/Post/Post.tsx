import React, {useEffect, useState, useCallback, memo} from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  TextInput,
  Keyboard,
} from 'react-native';
import {get, post, request} from 'app-util';
import {config} from 'app-config';
import {PostProps} from '.';

const PostScreen = ({}: PostProps) => {
  const [data, setData] = useState<[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isReFreshing, setReFreshing] = useState<Boolean>(false);
  const [isEndOfData, setEndOfData] = useState<Boolean>(false);
  const [isFetching, setFetching] = useState<Boolean>(true);
  const [isEndReached, setEndReached] = useState<Boolean>(false);
  const [job, setJob] = useState<string>('');
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
      const data = await get(`/todo-list?page=${page}&limit=10`, {
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

  const handleAddJob = useCallback(async () => {
    try {
      const data = await post('/todo-list', {
        job: job,
      });
      setData(prev => [...prev, data]);
    } catch (error) {
      console.log(error);
    } finally {
      setJob('');
      Keyboard.dismiss();
    }
  }, [job]);

  const handleEditJob = useCallback(async () => {}, []);

  const handleDeleteJob = useCallback(
    async (id: string, index: number) => {
      try {
        const response = await request.delete(`/todo-list/${id}`);
        if (response.status === 200) {
          setData(prev => {
            const newPrev = [...prev];
            newPrev.splice(index, 1);
            return newPrev;
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [data],
  );

  const renderItem = useCallback(({item, index}) => {
    return (
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          backgroundColor: config.color.white,
          ...config.color.shadow,
          marginTop: 10,
          marginHorizontal: 10,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text>---{item?.job}---</Text>
          <Text>{item?.description}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button title="Edit" onPress={handleEditJob} />
          <Button title="Del" onPress={() => handleDeleteJob(item.id, index)} />
        </View>
      </View>
    );
  }, []);

  const handleRenderFooter = useCallback(() => {
    return isEndReached && !isReFreshing && isFetching ? (
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
      <View style={{flexDirection: 'row', marginHorizontal: 10}}>
        <TextInput
          style={{
            backgroundColor: 'pink',
            paddingVertical: 5,
            paddingHorizontal: 10,
            flex: 1,
          }}
          value={job}
          onChangeText={value => setJob(value)}
        />
        <Button title="Add" onPress={handleAddJob} />
      </View>
      <Animated.FlatList
        data={data}
        extraData={isFetching}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 10}}
        keyExtractor={(item, index) => String(item?.id || index)}
        refreshing={isReFreshing}
        ListFooterComponent={handleRenderFooter}
        ListEmptyComponent={() => {
          return <Text>Empty</Text>;
        }}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        onRefresh={handleRefresh}
      />
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

export default memo(PostScreen);
