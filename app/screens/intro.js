import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {View, StyleSheet, TextInput, Text, Dimensions, StatusBar, ImageBackground} from 'react-native';
import RoundIconBtn from "../components/RoundIconBtn";
import colors from '../misc/colors'

const imbackground = {uri: 'https://e0.pxfuel.com/wallpapers/3/666/desktop-wallpaper-most-definitely-has-already-been-posted-a-long-time-ago-but-this-is-from-firewatch-iphone-x-iphone-x.jpg'}

// Màn hình intro khi lần đầu sử dụng app
const Intro = ({onFinish}) => {
    //  Giữ lại tên của người dùng trong state name
    const [name, setName] = useState('')

    const handleOnChangeText = (text) => setName(text);
    
    // Lấy tên của người dùng khi người dùng đã nhập tên
    const handleSubmit = async() => {
        const user = { name: name};
        await AsyncStorage.setItem('user', JSON.stringify(user));

        if (onFinish) onFinish();
    }

    return (
        <>
        <ImageBackground source={imbackground} resizeMode={'cover'} style={{flex: 1, }}>
        <StatusBar hidden />
        <View style={styles.container}>
            <Text style={styles.inputTitle}>Enter Your Name to Continue</Text>
            
            <TextInput 
            value={name} 
            onChangeText={handleOnChangeText} 
            placeholder="Enter Name" 
            style={styles.textInput}>
            </TextInput>

            {name.trim().length > 3 ? (
                <RoundIconBtn antIconName='arrowright'  onPress={handleSubmit}/>
            ) : null}
        </View> 
        </ImageBackground>
        </>
    )
}

const width = Dimensions.get('window').width - 50

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 25,
        marginBottom: 15,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    },
})

export default Intro;