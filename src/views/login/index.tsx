import React, { useState } from 'react'
import { StyleSheet, View, Button, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {
  loginApi
} from '../../api/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // 登录
  const login = () => {
    loginApi({
      username: username,
      password: password
    }).then(async (res: any) => {
      console.log('测试post', res)
      if (res) {
        try {
          await AsyncStorage.setItem('token', res.token)
          console.log('999', await AsyncStorage.getItem('token'))
          navigation.navigate('Tabs');
        } catch (e) {
          console.log(e)
        }        
      } else if (res === false) {
        console.log('用户名或者密码错误')
      } else {
        console.log('网络错误')
      }
    })    
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={login}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
})

export default Login