import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../misc/colors';

// Component xử lý việc hiển thị note trong màn hình chính và 
// kết nối với NoteDetail khi ấn vào
const Note = ({item, onPress}) => {
    const {title, desc} = item;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text numberOfLines={3}>{desc}</Text>
      </TouchableOpacity>
    )
}

// Padding Horizontal on the NoteScreen is 20, so 20 on both size is 40
const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
    },

})

export default Note;