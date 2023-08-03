import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  queryGroup
  // deleteGroupMessage
} from '../../../../api'
import { baseUrl } from '../../../../config'
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client'

const ChatRoom: React.FC = ({ route }: any) => {
  const { user } = useSelector((state: any) => state);
  const [groupname, setGroupname] = useState('')
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [socket, setSocket] = useState(null)
  const flatListRef = useRef(null);
  let isConnect = false
  // let keyboardDidShowListener = null

  useEffect(() => {
    console.log('测试执行123')

    setGroupname(route.params.group.groupname)

    initSocket()

    return () => {
      // keyboardDidShowListener.remove();
      if(socket) {
        socket.disconnect()
      }      
    }
  }, [])

  const initSocket = async() => {
    let token = await AsyncStorage.getItem('token')

    setSocket(io(baseUrl, {
      auth: {
        token
      }
    }))      
  }

  // useEffect(() => {
  //   // 测试，这个滚动没有生效，需要改
  //   keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {    
  //     console.log('测试keyboardDidShow')  
  //     scrollToBottom()
  //   });
  // }, [flatListRef])

  useEffect(() => {
    getMessages()        
  }, [groupname])

  useEffect(() => {
    if(socket && !isConnect) {
      isConnect = true
      console.log('测试socket', socket)

      socket.on('connect', () => {
        console.log(socket.connected) // true
      })

      joinGroup(groupname)

      socket.on('message', (data: any) => {
        console.log('测试返回消息', data)

        console.log('测试messages123', messages)

        // setMessages([...messages, {
        //   username: data.username,
        //   message: data.message,
        //   id: data.id
        // }]);

        setMessages((prevMessages) => {
          return [...prevMessages, {
            username: data.username,
            message: data.message,
            id: data.id
          }]
        })

        // console.log('测试messages123', messages)
        // setMessages(
        //   messages.concat(
        //     {
        //       username: data.username,
        //       message: data.message,
        //       id: data.id
        //     }
        //   )          
        // )
      })
    }      
  }, [socket])

  useEffect(() => {
    console.log('测试messages', messages)
  }, [messages])

  const inputFocusToBottom = () => {
    setTimeout(() => {
      scrollToBottom()
    }, 60)
  }

  const scrollToBottom = () => {
    // console.log('测试flatListRef', flatListRef)
    console.log('测试messages.length', messages.length)
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });

      // const contentHeight = flatListRef.current.getNativeScrollRef().scrollMetrics.contentLength;
      // const screenHeight = flatListRef.current.getNativeScrollRef().scrollMetrics.visibleLength;
      // const scrollToOffset = contentHeight - screenHeight;
      // flatListRef.current.getNativeScrollRef().scrollToOffset({ offset: scrollToOffset, animated: true });
    }
  }

  // useEffect(() => {
  //   // setTimeout(() => {
  //     scrollToBottom()
  //   // }, 50)
  // }, [messages]);

  // 获取group信息
  const getMessages = () => {
    queryGroup({
      groupname: groupname
    }).then((res: any) => {
      console.log('测试群信息', res)
      if (res && res.messages) {
        setMessages(JSON.parse(JSON.stringify(res.messages)))
      }
    })
  }

  // 发送消息
  const sendMessage = () => {
    if (newMessage) {
      // const message = {
      //   from: user.value,
      //   content: newMessage.value,
      // };

      // console.log('测试message', message)
      // 发送消息给服务器
      socket.emit('message', {
        username: user.username,
        userid: user.userid,
        message: newMessage,
        groupname: groupname
      })

      // 清空输入框
      setNewMessage('')
      // getMessages()
    }
  }

  // 加入群
  const joinGroup = (groupname: any) => {
    socket.emit('joinGroup', groupname)
  }

  const renderListItem = ({ item }) => (
    <View style={styles.chatItem}>
      <View style={styles.chatTop}>                
        <View style={styles.avatar}></View>
        <Text>{item.username}</Text>
      </View>
      <View style={styles.message}>
        <Text>{item.message}</Text>
      </View>
    </View>  
  );

  return (
    <SafeAreaView style={styles.area}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.messageContain}>
          <FlatList
            ref={flatListRef}
            style={styles.messageList}
            data={messages}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.1}
            onContentSizeChange={scrollToBottom}
          />
        </View>
        {/* {
          messages.map((item, index) => {
            return (
              <View style={styles.chatItem} key={index}>
                <View style={styles.chatTop}>                
                  <View style={styles.avatar}></View>
                  <Text>{item.username}</Text>
                </View>
                <View style={styles.message}>
                  <Text>{item.message}</Text>
                </View>
              </View>            
            )
          })
        } */}
        <View style={styles.sendContain}>
          <TextInput
            value={newMessage}
            style={styles.input}
            placeholder="请输入消息"
            onChangeText={setNewMessage}
            onFocus={inputFocusToBottom}
          />
          <TouchableOpacity 
            style={styles.sendBtn}
            onPress={() => sendMessage()}
          >
            <Text style={styles.sendBtnText}>发送</Text>
          </TouchableOpacity>
        </View>      
      </KeyboardAvoidingView>
    </SafeAreaView>    
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  messageContain: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  chatItem: {
    marginBottom: 10
  },
  chatTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 10
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 15,
    backgroundColor: '#ffc',
    marginRight: 10,
  },
  username: {

  },
  message: {
    backgroundColor: '#cff',
    padding: 10,
    lineHeight: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 0
  },
  sendContain: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sendBtn: {
    width: 50,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendBtnText: {
    color: '#666'
  }
});

export default ChatRoom