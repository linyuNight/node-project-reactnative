import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function Setting() {
  const user = useSelector((state: any) => state.user);

  return (
    <View style={styles.container}>
      {/* <Text>Setting</Text> */}
      <View  style={styles.itemList}>
        <Text>{ user.username }</Text>
      </View>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  itemList: {
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

export default Setting