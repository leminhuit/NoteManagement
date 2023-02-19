import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../misc/colors.js'

const Bells_ = ({date,style, onClickDate, onClickTime,onSubmit, onClose}) => {
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
      <View style={styles.btn}>
        <Text style={{backgroundColor: colors.ERROR,...styles.btnText}} onPress={onClose}>CANCEL</Text>
        <Text style={{backgroundColor: colors.PRIMARY,...styles.btnText}} onPress={onSubmit}>OK</Text>
      </View>
    </View>
  )
}

export default Bells_

const styles = StyleSheet.create({
    container:{
        height: "30%",
        width:"70%",
        zIndex: 1,
        position: 'absolute',
        left: "25%",
        top: "30%",
        backgroundColor: '#FFF',
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        elevation: 5,
        borderRadius: 14
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
    btn:{
      flexDirection: 'row',
    },
    btnText:{
      padding: 10,
      minWidth: 80,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.LIGHT,
      margin: 10
    }
})