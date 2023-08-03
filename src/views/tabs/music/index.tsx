import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import {
  queryMusic,
  getMusic
} from '../../../api'
import { useSelector } from 'react-redux';

function Music() {
  const { user } = useSelector((state: any) => state);
  const [musicList, setMusicList] = useState([])
  const [currentIndex, setCurrentIndex] = useState(null)
  const [audioSrc, setAudioSrc] = useState('')
  const [sound, setSound] = useState(null);

  const getData = () => {
    queryMusic({
      userid: user.userid
    }).then((res: any) => {
      setMusicList(res.files)
    })
  }

  // 播放音乐
  const play = async(item: any, index: any) => {
    stopSound()
    
    console.log('测试item', item)
    setCurrentIndex(index)

    let musicUrl = getMusic(item.name)
    // const encodedUri = encodeURIComponent(musicUrl);

    // const response = await fetch(musicUrl);
    // const audioData = await response.arrayBuffer();

    // let musicUrl = 'https://bibibi.website:3333/music/6005971JG07.mp3'

    console.log('测试musicUrl', musicUrl)

    try {
      console.log('测试999')
      // const sound = new Audio.Sound()

      // await sound.loadAsync({
      //   uri: musicUrl
      // })

      // await sound.playAsync()

      // const { sound } = await Audio.Sound.createAsync(
      //   { uri: musicUrl },
      //   { shouldPlay: true }
      // );

      // console.log('测试sound', sound)

      // const { sound } = await Audio.Sound.createAsync( require('./6005971JG07.mp3'))

      const { sound } = await Audio.Sound.createAsync(
        { uri: musicUrl },
      );

      await sound.playAsync();

      setSound(sound);
    } catch (error) {
      console.error('Error loading audio', error);
    }
    // setAudioSrc(getMusic(item.name))

    // nextTick(() => {
    //   audioRef.value.play()
    // })
  }

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  useEffect(() => {
    getData()

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [])

  return (
    <View style={styles.container}>
      {/* <Text>Music</Text> */}
      {
        musicList.map((item: any, index: any) => {
          return (
            <View key={ index }>
              <Text>{ item.name }</Text>
              <TouchableOpacity 
                onPress={() => play(item, index)}
              >
                <Text>播放</Text>
              </TouchableOpacity>
            </View>
          )
        })
      }      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Music