import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {AntDesign} from '@expo/vector-icons'

// Màn hình Not Found hiện ra khi người dùng nhập giá trị trong thanh Search Bar
// mà không có trong Notes được lưu trong Async Storage

const NotFound = () => {
    return (
      <View style={[StyleSheet.absoluteFillObject, styles.container]}>
        <AntDesign name='frowno' size={90} color='black' />

        <Text style={{marginTop: 20, fontSize: 20}}>Result Not Found</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
        zIndex: -1,
    },
})

export default NotFound;