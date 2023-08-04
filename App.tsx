import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome } from '@expo/vector-icons';
// import Chat from './src/views/chat/index'
// import Cloud from './src/views/cloud/index'
// import Music from './src/views/music/index'
// import Setting from './src/views/setting/index'
import Login from './src/views/login/index'
import Tabs from './src/views/tabs/index'
import { setLoginExpiredCallback } from './src/server';
import { getCurrentUser } from './src/api/index'
import { Provider } from 'react-redux';
import ChatRoom from './src/views/tabs/chat/chatRoom'
import store from './src/store';
import { setUser } from './src/store/reducers'
// import { useNavigation } from '@react-navigation/native';
import { setNavigation } from './src/views/tabs/chat'

// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
let navigationRef: any = null;


// const ChatRoomStack = createNativeStackNavigator();
// function ChatRoomScreen() {
//   // const navigation: any = useNavigation();

//   // setNavigation(navigation)

//   return (
//     <ChatRoomStack.Navigator>
//       <ChatRoomStack.Screen name="ChatRoom" component={ChatRoom} />
//     </ChatRoomStack.Navigator>
//   );
// }

const App: React.FC = () => {
  setLoginExpiredCallback(() => {
    // 在这里进行页面跳转，例如跳转到登录页面
    if (navigationRef) {
      navigationRef.navigate('Login'); // 这里使用 navigationRef 进行页面导航
    }
  });

  useEffect(() => {
    checkLoginStatus();

    setNavigation(navigationRef)
  }, []);

  const checkLoginStatus = async () => {
    // 进来应该是loading状态
    // ... 检查本地登录状态 ...
    getCurrentUser().then((res: any) => {
      console.log('测试用户', res)
      if (res && res.username) {
        // globalStore.user = {
        //   userid: res.id,
        //   username: res.username
        // }
  
        // user.value = globalStore.user

        store.dispatch(setUser({
          userid: res.id,
          username: res.username
        }))

        if (navigationRef) {
          // navigationRef.navigate('Tabs'); // 这里使用 navigationRef 进行页面导航
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Tabs' }]
          });
        }
      } else {
        if (navigationRef) {
          // navigationRef.navigate('Login'); // 这里使用 navigationRef 进行页面导航
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });
        }
      }
    }).catch((err: any) => {
      console.log(err)
    })
  };

  return (
    // <View style={styles.container}>
    //   {/* <Text>Open up App.tsx to start working on your app!!!!</Text>
    //   <View
    //     style={styles.cube}
    //   ></View> */}
    //   <View style={styles.webviewContainer}>
    //     {/* <WebView
    //       source={{ uri: 'https://www.baidu.com' }}
    //     /> */}
    //     <WebView
    //       source={{ uri: 'https://bibibi.website' }}
    //     />
    //   </View>
      
    //   {/* <StatusBar style="auto" /> */}
    // </View>
    <Provider store={store}>
      <NavigationContainer
        ref={(ref) => {
          navigationRef = ref;
        }}
      >
        {/* <SafeAreaView style={styles.area}> */}
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
            <Stack.Screen name="ChatRoom" component={ChatRoom} options={{ headerShown: false }} />
          </Stack.Navigator>
        {/* </SafeAreaView>         */}
      </NavigationContainer>  
    </Provider>      
  );
}

export default App

const styles = StyleSheet.create({
  area: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webviewContainer: {
    width:  '100%',
    height: 400,
    backgroundColor: '#fff',
  },
  tabBar: {
    height: 70, // 设置底部选项卡栏的高度
    backgroundColor: 'white', // 设置底部选项卡栏的背景颜色
    paddingTop: 10,
    paddingBottom: 10
  },
});
