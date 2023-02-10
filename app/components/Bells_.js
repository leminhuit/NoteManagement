import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../misc/colors.js'

const Bells_ = ({date,style, onClickDate, onClickTime,onSubmit}) => {
    const date_ = new Date(date)
    const day = date_.getDate();
    const month = date_.getMonth() + 1;
    const year = date_.getFullYear();
    const hrs = date_.getHours();
    const min = date_.getMinutes();
  return (
    <View style={[styles.container,{...style}]}>
      <Text style={styles.DateTime}>Ngày</Text>
      <Text style={styles.onDateTime} onPress={onClickDate}>{day + '/' + month + '/' + year}</Text>
      <Text style={styles.DateTime}>Giờ</Text>
      <Text style={styles.onDateTime} onPress={onClickTime}>{hrs + ":" + min}</Text>
      <View style={styles.btnOK}>
        <Button title='OK' onPress={onSubmit}/>
      </View>
    </View>
  )
}

export default Bells_

const styles = StyleSheet.create({
    container:{
        height: "40%",
        width:"50%",
        zIndex: 1,
        position: 'absolute',
        left: "25%",
        top: "30%",
        backgroundColor: '#eee',
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    DateTime:{
      fontSize: 20,
      color: colors.PRIMARY,
      fontWeight: 'bold',
      marginBottom: 10
    },
    onDateTime:{
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    btnOK:{
      width: 100,
      color: "#ccc"
    },
})