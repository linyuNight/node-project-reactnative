import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Chat from './chat/index'
import Cloud from './cloud/index'
import Music from './music/index'
import Setting from './setting/index'

const Tab = createBottomTabNavigator();

const Tabs: React.FC = () => {

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

    <SafeAreaView style={styles.area}>
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
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="Cloud" 
          component={Cloud}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="cloud" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="Music" 
          component={Music}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="music" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
        <Tab.Screen
          name="Setting"
          component={Setting}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="gear" size={size} color={color} />
            ),
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
    
  );
}

export default Tabs

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#25292e',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // webviewContainer: {
  //   width:  '100%',
  //   height: 400,
  //   backgroundColor: '#fff',
  // },
  area: {
    flex: 1
  },
  tabBar: {
    height: 70, // 设置底部选项卡栏的高度
    backgroundColor: 'white', // 设置底部选项卡栏的背景颜色
    paddingTop: 10,
    paddingBottom: 10
  },
});
