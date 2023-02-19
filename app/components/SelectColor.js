import { Button, FlatList, ScrollView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import colors from '../misc/colors.js'
import colorBG from '../misc/backgroundColor.js'

const SelectColor = ({style,onPress}) => {
  const colors = Object.values(colorBG)
  
  
  console.log(colors)
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style ={{ maxHeight: 50}}>
    {colors.map((color, index) => (
      <TouchableOpacity key={index} style={{ height: 50}}>
        <Text key = {color} onPress = {onPress} style={{borderWidth: 1,backgroundColor: color,width: 30, height: 30, borderRadius: 50, marginTop: 10, marginLeft: 10}}></Text>
      </TouchableOpacity>
    ))}
    </ScrollView>
  )
}

export default SelectColor

const styles = StyleSheet.create({
    
})