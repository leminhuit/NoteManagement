import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../misc/colors.js'

const SelectColor = ({style,onPress}) => {
  const [color, setColor] = useState('')
  return (
    <View style={styles.container}>
      <Text style={[style,{...styles.colorBLUE}]} onPress = {onPress} key = "blue" ></Text>
      <Text style={[style,{...styles.colorGREEN}]} onPress = {onPress} key = "green"></Text>
      <Text style={[style,{...styles.colorRED}]} onPress = {onPress} key = "red"></Text>
      <Text style={[style,{...styles.colorBROWN}]} onPress = {onPress} key = "brown"></Text>
    </View>
  )
}

export default SelectColor

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#ccc",
        position: 'absolute',
        bottom: 100,
        width: 200,
        height: 54,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingRight: 30,
        borderRadius: 10
    },
    colorBLUE:{
        backgroundColor: colors.BLUE,
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    colorGREEN:{
        backgroundColor: colors.GREEN,
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    colorRED:{
        backgroundColor: colors.RED,
        width: 30,
        height: 30,
        borderRadius: 50,
    },
    colorBROWN:{
        backgroundColor: colors.BROWN,
        width: 30,
        height: 30,
        borderRadius: 50,
    },
})