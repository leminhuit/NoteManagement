import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {NavigationContainer} from '@react-navigation/native'

import Intro from './app/screens/intro'
import NoteScreen from './app/screens/NoteScreen';
import NoteDetail from './app/components/NoteDetail';
import NoteProvider from './app/contexts/NoteProvider';

// Import Stack để thực hiện việc di chuyển giữa các màn hình
const Stack = createNativeStackNavigator();

export default function App() {
  // State User được dùng đẻ quan sát tên của người dùng và để load một số component
  const [user, setUser] = useState({})
  // State first time để thể hiện lần đầu load phần mềm sẽ xuất hiện màn hình nhập tên
  const [firstTimeOpen, setFirstTimeOpen] = useState(false)

  // Hàm tìm người dùng trong Async Storage, nếu có thì setUser cho app
  const findUser = async() => {
    const result = await AsyncStorage.getItem('user');
    if (result === null) return setFirstTimeOpen(true);

    setUser(JSON.parse(result))
    setFirstTimeOpen(false)
  };

  // Hàm render sau khi component chinh đã update, nhầm tìm người dùng nếu đã sử dụng qua app
  useEffect(() => {
    // AsyncStorage.clear()
    findUser()
  }, [])

  // If there is no "props" properties, you can't use Navigation in the NoteScreen components
  const RenderNoteScreen = props => <NoteScreen {...props} user={user}/>

  // Nếu lần đầu sử dụng app thì render màn hình Intro, không thì render thẳng màn
  // hình Note của app, hàm onFinish là hàm giả nhàm pass được hàm findUser cho màn hình Intro
  if (firstTimeOpen) return <Intro onFinish={findUser}/>

  return (
    <NavigationContainer>
      {/* Component NoteProvider nhằm quản lý việc lưu trữ cũng như đọc Notes đã lưu
      trong Async Storage, gồm 3 hàm notes, setNotes và findNotes */}
      <NoteProvider>
        {/* Stack Navigator để di chuyển qua lại các màn hình */}
          <Stack.Navigator screenOptions={{headerTitle: '', headerTransparent: true}}>
            {/* Màn hình Note Screen chính */}
            <Stack.Screen component={RenderNoteScreen} name="NoteScreen"/>
            {/* Màn hình của từng Note riêng biệt */}
            <Stack.Screen component={NoteDetail} name="NoteDetail"/>
          </Stack.Navigator> 
      </NoteProvider>
    </NavigationContainer>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
