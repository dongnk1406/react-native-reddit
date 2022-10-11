import React, {useState, useCallback, useRef, useEffect} from 'react';
import {Button, Alert, Text, ScrollView} from 'react-native';
import YoutubePlayer, {
  getYoutubeMeta,
  YoutubeIframeRef,
} from 'react-native-youtube-iframe';
import {GameDetailProps, VideoInfoState} from '.';

function GameDetailScreen({}: GameDetailProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
  const [videoInfo, setVideoInfo] = useState<VideoInfoState>({
    title: '',
    authorName: '',
    providerName: '',
  });
  const youtubePlayerRef = useRef<YoutubeIframeRef | null>(null);

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  useEffect(() => {
    const getInitTimeVideo = async () => {
      const videoInfo = await getYoutubeMeta('95SVAJQvZao');
      setVideoInfo({
        title: videoInfo.title,
        authorName: videoInfo.author_name,
        providerName: videoInfo.provider_url,
      });
    };

    getInitTimeVideo();

    return () => {};
  }, []);

  return (
    <ScrollView>
      <YoutubePlayer
        ref={youtubePlayerRef}
        height={250}
        play={playing}
        videoId={'95SVAJQvZao'}
        allowWebViewZoom
        onChangeState={onStateChange}
      />
      <Button
        title="Log details"
        onPress={async () => {
          const currentTime = await youtubePlayerRef.current?.getCurrentTime();
          setCurrentTime(currentTime);
        }}
      />
      <Text>Current time: {Math.floor(Number(currentTime))}</Text>
      <Text>
        {`Title: ${videoInfo?.title} ${'\n'} Provide: ${
          videoInfo?.providerName
        } ${'\n'} Author: ${videoInfo?.authorName} ${'\n'}`}
      </Text>
    </ScrollView>
  );
}

export default GameDetailScreen;
