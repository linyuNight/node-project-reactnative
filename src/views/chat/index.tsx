import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function Chat() {
  let arr = [0, 1, 2]

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        {arr.map((val, index) => {
          return (
            <View style={styles.chatItem} key={index}>{ val }</View>
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