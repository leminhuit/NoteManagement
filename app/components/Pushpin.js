import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import colors from '../misc/colors'

// Hàm tạo ra một nút (Button) có custom style là hình tròn
const Pushpin = ({antIconName, size, color, style, onPress}) => {
    return <AntDesign 
    name={antIconName} 
    size={size || 24} 
    color={color || colors.DARK}
    style={[styles.icon, {...style}]}
    onPress= {onPress}
    />
}

const styles = StyleSheet.create({
    icon:{
       
    }
})

export default Pushpin;