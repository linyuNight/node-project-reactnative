import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Header from '../../../../components/Header'
import { 
  queryCloudData, 
  downloadCloudFile, 
  getVideo, 
  createFolder, 
  deleteCloudFile 
} from '../../../../api'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player';

const CloudDetail = ({ stackIndex, addStack, path, emitGoBack }: any) => {
  const user = useSelector((state: any) => state.user);
  const route: any = useRoute();
  const navigation = useNavigation();
  const [showBack, setShowBack] = useState(false)
  const [fileList, setFileList] = useState([])
  const [videoSrc, setVideoSrc] = useState('')

  const windowWidth = Dimensions.get('window').width;
  const itemWidth = (windowWidth - 30) / 3; // 3 items per row, with 20 as the total horizontal padding

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const getFileList = (path: any) => {
    queryCloudData({
      userid: user.userid,
      path: path ? path : null
    }).then((res: any) => {
      setFileList(JSON.parse(JSON.stringify(res)).files.slice(0))
    })
  }

  useEffect(() => {
    if (stackIndex == 0) {
      setShowBack(false)
    } else {
      setShowBack(true)
    }

    // getFileList(null)
    getFileList(path)
  }, [])

  const toNext = (item: any) => {
    // console.log('测试toNextitem', item)
    if (!item.isFile) {
      addStack(item)
    }    
  }

  // 播放视频
const play = (item: any) => {
  getVideo({
    userid: user.userid,
    filename: item.name,
    path: path
  }).then((res: any) => {
    const blob = new Blob([res]);
    const url = URL.createObjectURL(blob);

    console.log('测试url', url)
    setVideoSrc(url)
  }).catch(error => {
    console.error('下载文件失败：', error);
  });
}

  const renderListItem = ({ item }) => {
    // console.log('测试item', item)
    return (
      <TouchableOpacity 
        style={[styles.item, { width: itemWidth, height: itemWidth }]}
        onPress={() => toNext(item)}
      >        
        <Text style={styles.name}>{ item.name.slice(0, 10) }</Text>
        {
          item.isFile ? 
          <FontAwesome name="file" size={28} /> :
          <FontAwesome name="folder" size={28} />
        }
        {
          item.isFile ? 
          <TouchableOpacity onPress={() => play(item)}>
            <Text>Play</Text>
          </TouchableOpacity> : null
        }
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header title={'Cloud'} emitGoBack={emitGoBack} showBack={showBack} navigation={navigation} isPop={true} />
      <FlatList
        style={styles.cloudList}
        data={fileList}
        renderItem={renderListItem}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
      {/* <VideoPlayer
        style={styles.video}
        videoProps={{
          shouldPlay: true,
          resizeMode: 'contain',
          source: { uri: videoSrc },
        }}
        isPortrait={!isFullScreen}
        fullscreen={isFullScreen}
        switchToPortrait={handleFullScreen}
        switchToLandscape={handleFullScreen}
      />
      {!isFullScreen && (
        <TouchableOpacity style={styles.fullScreenButton} onPress={handleFullScreen}>
        </TouchableOpacity>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cloudList: {
  },
  listContainer: {
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5, // Adjust the vertical margin as needed
    marginHorizontal: 5, // Adjust the horizontal margin as needed
    borderRadius: 6,
    backgroundColor: 'lightgray',
  },
  name: {
    marginBottom: 6
  },
  video: {
    width: 300,
    height: 200
  },
  fullScreenButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    // 这里设置全屏按钮样式
  },
});

export default CloudDetail