import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Audio } from 'expo-av';
import {
  queryMusic,
  getMusic
} from '../../../api'
import { useSelector } from 'react-redux';

function Music() {
  const user = useSelector((state: any) => state.user);
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

  const renderListItem = ({ item, index }) => (
    <View style={styles.musicItem}>
      <Text style={styles.musicName}>{ item.name }</Text>
      <TouchableOpacity
        style={styles.playBtn}
        onPress={() => play(item, index)}
      >
        <Text style={styles.playBtnText}>播放</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.area}>    
      <View style={styles.container}>
        {/* <Text>Music</Text> */}
        <FlatList
          style={styles.musicList}
          data={musicList}
          renderItem={renderListItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  musicList: {
    flex: 1,
    padding: 14
  },
  musicItem: {
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10
  },
  musicName: {
    flex: 1
  },
  playBtn: {
    width: 50,
  },
  playBtnText: {
    color: 'blue'
  }
});

export default Music