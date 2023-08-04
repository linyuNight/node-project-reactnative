import axios from 'axios'
import { baseUrl } from '../config/index'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import router from '@/router'

let loginExpiredCallback = null;

export function setLoginExpiredCallback(callback) {
  loginExpiredCallback = callback;
}

const server = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
  headers: {
    Authorization: null
  }
})

// 请求拦截
server.interceptors.request.use(
  async (config) => {
    // const tolen = localStorage.getItem('token')
    const tolen = await AsyncStorage.getItem('token')
    config.headers.Authorization = tolen
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截
server.interceptors.response.use(
  res => {
    // console.log('测试res', res)
    if (res.status === 200 || res.status === 206) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(new Error('Error Message'))
    }
  },
  err => {
    // token 失效
    if (err.response.status === 401) {
      localStorage.removeItem('token')

      // router.push({
      //   name: 'login'
      // })
      if (loginExpiredCallback) {
        loginExpiredCallback();
      }
      // return Promise.reject(new Error("to login"))
    }
  }
)

export default server
