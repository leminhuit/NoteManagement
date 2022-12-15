import React, { Component } from 'react'
import { Text, StyleSheet, View, TextInput } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from '../misc/colors'

// Search Bar là thanh tìm kiếm trong NoteScreen, giúp ta tìm được các Notes đã viết
// SearchBar được khởi tạo với các biến gồm :
// containerStyle để tạo style cho search bar
// value để lưu trữ giá trị của TextInput (lúc ta muốn tìm kiếm thứ gì đó)
// onChangeText function để xử lý việc tìm kiếm khi value thay đổi
// onClear function khi người dùng ấn nút X bên phải của search bar
const SearchBar = ({containerStyle, value, onChangeText, onClear}) => {
    return (
      <View style={[styles.container, {...containerStyle}]}>
        <TextInput value={value} onChangeText={onChangeText} style={styles.searchBar} 
        placeholder='Search here...'></TextInput>

        {/* Chỉ hiện nút Clear khih người dùng có nhập thông tin tìm kiếm vào */}
        {value ? <AntDesign name='close' size={20} color={colors.PRIMARY}
          onPress={onClear} style={styles.clearIcon}/> : null}
      </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20
    },
    container: {
      justifyContent: 'center'
    },
    clearIcon: {
      position: 'absolute',
      right: 10,
    },
})

export default SearchBar;