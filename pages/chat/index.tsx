import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Chat() {
  return (
    <View style={styles.container}>
      <Text>Chat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Chat