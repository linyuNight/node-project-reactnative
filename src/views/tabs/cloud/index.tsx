import React, { useEffect, useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CloudDetail from './cloudDetail'
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Cloud: React.FC = () => {
  const [pageList, setPageList] = useState([{
    name: 'Cloud_0',
    path: null
  }])  
  const navigation: any = useNavigation()
  const isFocused = useIsFocused();
  const prevPageListLengthRef = useRef(0);

  const addStack = (item: any) => {    
    let len = pageList.length
    let lastItem = pageList[len - 1]

    console.log('测试path666', lastItem.path ? `${lastItem.path}/${item.name}` : `${item.name}`)
    setPageList((val: any) => {
      return [...val, {
        name: `Cloud_${len}`,
        path: lastItem.path ? `${lastItem.path}/${item.name}` : `${item.name}`
      }]
    })
  }

  const emitGoBack = () => {
    setPageList((val: any) => {
      const currentPageList = [...val];
      const updatedPageList = currentPageList.slice(0, -1);
      return updatedPageList;
    })
  }

  // useEffect(() => {
  //   if (isFocused) {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{ name: 'Cloud_0' }],
  //     });
  //   }
  // }, [isFocused]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // e.preventDefault();
      console.log('测试navigation.goBack')
      navigation.goBack();
    });
  }, [])

  useEffect(() => {
    // console.log('测试pageList123', pageList)
    if (pageList.length > 1 && pageList.length > prevPageListLengthRef.current) {
      navigation.push(`Cloud_${pageList.length -1}`);
    }
    prevPageListLengthRef.current = pageList.length
  }, [pageList.length])

  return (
    <Stack.Navigator initialRouteName="CloudDetail">
      {
        pageList.map((item, index) => (
          <Stack.Screen 
            name={item.name} 
            options={{ headerShown: false }} 
            key={index}
          >
            {(props) => <CloudDetail 
              {...props} 
              stackIndex={index} 
              addStack={addStack} 
              path={item.path}
              emitGoBack={emitGoBack}
            />}
          </Stack.Screen>
        ))
      }
    </Stack.Navigator>
  );
}

export default Cloud