import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { queryAllGroups } from '../../api/index'

function Chat() {
  let [groups, setGroups] = useState([])

  useEffect(() => {
    handlerQueryAllGroups()
  }, [])

  // 查看所有群
const handlerQueryAllGroups = () => {
  // globalStore.roomLoading = true
  queryAllGroups().then((res: any) => {
    // groups.value = JSON.parse(JSON.stringify(res)).map((val: any) => {
    //   return {
    //     id: val._id,
    //     groupname: val.groupname,
    //     creator: val.creator
    //   }
    // })

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

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {groups.map((val, index) => {
          return (
            <View style={styles.chatItem} key={index}>
              <Text>{ val.groupname }</Text>
            </View>
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
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12
  },
  chatItem: {
    paddingLeft: 20,
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#ffc',
    borderRadius: 12,
    marginBottom: 10
  }
});

export default Chat