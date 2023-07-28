import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Chat from './src/views/chat/index'
import Cloud from './src/views/cloud/index'
import Music from './src/views/music/index'
import Setting from './src/views/setting/index'

const Tab = createBottomTabNavigator();

export default function App() {
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

    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBar, // 设置 Tab 导航栏的高度
        }}
      >
        <Tab.Screen 
          name="Chat" 
          component={Chat}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="comments" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Cloud" 
          component={Cloud}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cloud" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen 
          name="Music" 
          component={Music}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="music" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="gear" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>    
  );
}

const styles = StyleSheet.create({
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
