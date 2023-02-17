import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../misc/colors.js'

const SelectColor = ({style,onPress}) => {
  return (
    <View style={styles.container}>
      <Text style={[style,{...styles.colorBLUE}]}></Text>
      <Text style={[style,{...styles.colorGREEN}]}></Text>
      <Text style={[style,{...styles.colorRED}]}></Text>
      <Text style={[style,{...styles.colorBROWN}]}></Text>
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