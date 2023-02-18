import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../misc/colors';
import Pushpin from './Pushpin.js';

// Component xử lý việc hiển thị note trong màn hình chính và 
// kết nối với NoteDetail khi ấn vào
const Note = ({item, onPress,onPressPush}) => {
    const {title, desc,isPushpin,color} = item;

    const replaceHTML = desc.replace(/<(.|\n)*?>/g, "").trim();
    const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
    return (
      <TouchableOpacity onPress={onPress} style={[styles.container,{backgroundColor: color}]}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>

        {
          isPushpin===true?<Pushpin antIconName='pushpin' style={styles.addPushpin} onPress={onPressPush}/>:
          <Pushpin antIconName='pushpino' style={styles.addPushpin} onPress={onPressPush}/>
        }
        <Text numberOfLines={3}>{replaceWhiteSpace}</Text>
      </TouchableOpacity>
    )
}

// Padding Horizontal on the NoteScreen is 20, so 20 on both size is 40
const width = Dimensions.get('window').width - 40

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: colors.LIGHT,
    },
    addPushpin:{
      position: 'absolute',
      right:10,
      top: 6,
      fontSize: 20,
      zIndex: 1
    }

})

export default Note;

//test