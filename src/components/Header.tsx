import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomHeader = ({ title, showBack = true, navigation, emitGoBack, isPop = false }: any) => {
  const goBack = () => {
    if (isPop) {
      navigation.pop()
    } else {
      navigation.goBack()
    }
    if (emitGoBack) {
      emitGoBack()
    }    
    // navigation.goBack()
  }

  return (
    <View style={styles.headerContainer}>
      {/* 自定义头部左侧返回按钮 */}
      {showBack ? (
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      ) : null}      
      {/* 自定义头部标题 */}
      <Text style={styles.title}>{title}</Text>
      {/* 自定义头部右侧按钮 */}
      {/* Add your custom buttons here */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'none',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomHeader;