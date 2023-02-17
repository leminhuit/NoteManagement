import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Foundation } from '@expo/vector-icons'
import colors from '../misc/colors'

// Hàm tạo ra một nút (Button) có custom style là hình tròn
const RoundIconBtn_Found = ({antIconName, size, color, style, onPress}) => {
    return <Foundation 
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

export default RoundIconBtn_Found;