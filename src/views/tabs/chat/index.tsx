import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
import { queryAllGroups } from '../../../api/index'
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../../../store/reducers'
import { useNavigation } from '@react-navigation/native';
// import { RootState } from '../../../store'

let navigation: any = null

export const setNavigation = (callback: any) => {
  navigation = callback
}

const ChatHome: React.FC = () => {
  const navigation: any = useNavigation();
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  // 群列表
  let [groups, setGroups] = useState([])

  useEffect(() => {
    handlerQueryAllGroups()
  }, [])

  // 查看所有群
  const handlerQueryAllGroups = () => {
    // globalStore.roomLoading = true
    queryAllGroups().then((res: any) => {
      setGroups(JSON.parse(JSON.stringify(res)).map((val: any) => {
        return {
          id: val._id,
          groupname: val.groupname,
          creator: val.creator
        }
      }))

      // globalStore.groups = groups.value
    }).catch((err: any) => {
      console.log(err)
    }).finally(() => {
      // globalStore.roomLoading = false
    })
  }

  const handlerClick = () => {
    dispatch(increment(9))
  }

  const handlerIntoRoom = (val: any) => {
    console.log('测试val', val)
    navigation.navigate('ChatRoom', { group: val });
  }  

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <Text style={styles.groupTitle}>群组{user.userid}</Text>
        <Button title="Button" onPress={handlerClick}></Button>
        {groups.map((val, index) => {
          return (
            <TouchableOpacity onPress={ () => handlerIntoRoom(val) } key={index}>
              <View style={styles.chatItem}>
                <Text>{ val.groupname }</Text>
              </View>
            </TouchableOpacity>            
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flex: 1,    
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12
  },
  groupTitle: {
    marginBottom: 10
  },
  chatItem: {
    paddingLeft: 20,
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginBottom: 10
  }
});

export default ChatHome