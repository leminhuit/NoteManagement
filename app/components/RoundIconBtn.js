import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AntDesign,Foundation } from '@expo/vector-icons'
import colors from '../misc/colors'

// Hàm tạo ra một nút (Button) có custom style là hình tròn
const RoundIconBtn = ({antIconName, size, color, style, onPress}) => {
    return <AntDesign 
    name={antIconName} 
    size={size || 24} 
    color={color || colors.LIGHT}
    style={[styles.icon, {...style}]}
    onPress= {onPress}
    />
}

const styles = StyleSheet.create({
    icon:{
        backgroundColor: colors.PRIMARY,
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    }
})

export default RoundIconBtn;