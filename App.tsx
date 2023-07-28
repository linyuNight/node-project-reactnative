import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Chat from './pages/chat/index'
import Cloud from './pages/cloud/index'
import Music from './pages/music/index'
import Setting from './pages/setting/index'

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Screen</Text>
    </View>
  );
}

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
      <Tab.Navigator>
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
});
