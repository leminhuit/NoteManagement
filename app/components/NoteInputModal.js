import React, { Component, useEffect, useRef, useState } from 'react'
import { Text, StyleSheet, View, Modal, Keyboard, StatusBar, TextInput, TouchableWithoutFeedback, ScrollView, Platform, Alert  } from 'react-native'
import colors from '../misc/colors'
import RoundIconBtn from "../components/RoundIconBtn";
import RoundIconBtn_Found from "../components/RoundIconBtn_Found";
import DateTimePicker from '@react-native-community/datetimepicker'
import Bells_ from './Bells_.js';
import SelectColor from './SelectColor.js'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';

/////////////////////////////////////////////////
import {
    actions,
    RichEditor,
    RichToolbar,
  } from "react-native-pell-rich-editor";
/////////////////////////////////////////////////

// Modal xuất hiện khi ta muốn tạo ra Note mới hoặc Edit Note cũ
// Gồm các thuộc tính :
// visible : để ẩn hiện modal này cho edit hay tạo note mới
// onClose : hàm xử lý khi tắt đi modal
// onSubmit : hàm xử lý khi xác nhận lưu Note
// note: lưu, đọc dữ liệu của Note trong Async Storage
// isEdit: xác định xem liệu mở Note lên để edit hay là note mới

const NoteInputModal = ({visible, onClose, onSubmit, note, isEdit}) => {
    // Title dùng để lưu trữ tên của note
    const [title, setTitle] = useState('');
    // Desc dùng để lưu trữ nội dung của note
    const [desc, setDesc] = useState('');

    const [date,setDate] = useState('');
    const [mode, setMode] = useState('datetime')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')
    const [isbells, setIsBells] = useState(false)
    const [dateTime, setDateTime] = useState(new Date());
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    // ---------- select color
    const [selectColors, setSelectColors] = useState(false)
    const [color, setColor] = useState('#FFF')
    
    // const noteColor = note.color
    if (note){
        var noteColor = note.color
    }
    function onChange(event, selectedDate) {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'ios');
        setDate(currentDate);

        if (selectedDate) {
            if (selectedDate < new Date()) {
                selectedDate = new Date();
                Alert.alert('Please select a future date and time');
            }
            let tempDate = new Date(currentDate);
            let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
            let fTime = tempDate.getHours() + ':' + tempDate.getMinutes();
            setText(fDate + ' - ' + fTime);
            
            // console.log(fDate + ' - ' + fTime);
    
            setDateTime(selectedDate);
        }     
    }

    const showMode = (currentMode) =>{
        setShow(true)
        setMode(currentMode)
    }

    /////////////////////////////////////////////////
    const richText = useRef();

    const richTextHandle = (descriptionText) => {
        if (descriptionText) {
          setDesc(descriptionText);
        } else {
          setDesc("");
        }
    };

    const submitContentHandle = () => {
        // const replaceHTML = desc.replace(/<(.|\n)*?>/g, "").trim();
        // const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();
    
        if (!title.trim() && !desc.trim()) {
            setText('')
            setSelectColors(false)
            setColor("#FFF")
            return onClose();
        }
//////////////////////////////////////////////////// thêm bells
        if (isEdit) {
            console.log("Im here")
            onSubmit(title, desc,date,color, Date.now())
        }
        else{
            console.log("Now Im here",date)
            onSubmit(title, desc,date,color);
            setTitle('');
            setDesc('');
            setDate('')
            // console.log(date)
            setSelectColors(false)
            setColor("#FFF")
        }
        setText('')
        onClose();
    };

    const handleOnPressBell = ()=>{
        setIsBells(true)
        setDate(new Date())
    }
    /////////////////////////////////////////////////

    // Xử lý việc đóng bàn phím khi ấn vào vùng trống của Modal
    const handleModalClose = () => {
        Keyboard.dismiss();
    }

    // Nếu mở Modal lên để Edit, mở lại Note cũ đã viết
    useEffect(() => {
        if (isEdit) {
            setTitle(note.title)
            setDesc(note.desc)
        };
        const getPermission = async () => {
            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                  const { status } = await Notifications.requestPermissionsAsync();
                  finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                  alert('Enable push notifications to use the app!');
                  await AsyncStorage.setItem('expopushtoken', "");
                  return;
                }
                const token = (await Notifications.getExpoPushTokenAsync()).data;
                await AsyncStorage.setItem('expopushtoken', token);
            } else {
              alert('Must use physical device for Push Notifications');
            }
      
              if (Platform.OS === 'android') {
                Notifications.setNotificationChannelAsync('default', {
                  name: 'default',
                  importance: Notifications.AndroidImportance.MAX,
                  vibrationPattern: [0, 250, 250, 250],
                  lightColor: '#FF231F7C',
                });
              }
          }
      
          getPermission();
      
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
          });
      
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});
      
          return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
          };
    }, [isEdit])


    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }


    // Xử lý việc đóng modal
    const closeModal = () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    }


    const onHandleColor = (e) =>{
        const se_colors = e._dispatchInstances._debugOwner.key
        setColor(se_colors)
        setSelectColors(false)
    }

    async function scheduleNotification() {
        setIsBells(false)
        // Set up the notification payload
        let notificationId = await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: `You have a reminder for the note `,
          },
          trigger: {
            seconds: Math.floor((dateTime.getTime() - Date.now()) / 1000),
          },
        });
    
        Alert.alert('Scheduled notification with id:', notificationId);
      }

      const styleEditor = {
        backgroundColor: noteColor || color
      }
    return (
        <>
        <StatusBar hidden/>
        <Modal visible={visible} animationType='fade'>
            <View style={{backgroundColor:noteColor || color,...styles.container}}>
                <TextInput
                    value={title}
                    onChangeText={text => handleOnChangeText(text, 'title')}
                    placeholder='Title'
                    style={[styles.input, styles.title]}
                />
                {/* TO-DO list: Thay thể TextInput đơn giản thành Rich Text Editor để format Note */}
                {/* <TextInput
                    value={desc}
                    multiline
                    placeholder='Note'
                    style={[styles.input, styles.desc]}
                    onChangeText={text => handleOnChangeText(text, 'desc')}
                /> */}

                <ScrollView style={{height: "100%",backgroundColor: noteColor || color}}>
                    <RichToolbar
                        editor={richText}
                        selectedIconTint="#873c1e"
                        iconTint="#312921"
                        actions={[
                        actions.insertImage,
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertLink,
                        actions.setStrikethrough,
                        actions.setUnderline,
                        ]}
                        style={styles.richTextToolbarStyle} />
            
                    <RichEditor
                        ref={richText}
                        initialContentHTML={desc}
                        onChange={richTextHandle}
                        placeholder="Write your cool content here :)"
                        initialHeight={250}
                        editorStyle = {styleEditor}
                    />
                </ScrollView>

                
               {isbells && <Bells_ 
                    date={date} 
                    onClickDate = {()=>showMode('date')} 
                    onClickTime = {()=>showMode('time')} 
                    onSubmit={scheduleNotification} />}
           
            
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
            {show && (<DateTimePicker
                testID='dateTimePicker'
                value={date}
                mode = {mode}
                is24Hour={true}
                display = 'default'
                onChange={onChange}
            />)}
            </View>
            <Text style={styles.bellText}>{text}</Text>
            
            {
                selectColors && 
                <View style={styles.colorContainer}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: "#D37D84", marginLeft: 10}}>Màu</Text>
                    <SelectColor onPress={onHandleColor}/>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: "#D37D84", marginLeft: 10}}>Hình nền</Text>
                </View>
            }
            <View style={styles.footer}>
                <RoundIconBtn_Found antIconName='paint-bucket' style={{backgroundColor: "#FFF",color: "#000", ...styles.paint}} onPress = {()=>selectColors ? setSelectColors(false) : setSelectColors(true)}/>
                <View style={styles.btnContainer}>
                    <RoundIconBtn style={{color: colors.DARK, backgroundColor: colors.LIGHT}} size={15} antIconName='check' onPress={submitContentHandle}/>
                    { title.trim() || desc.trim() ? (<RoundIconBtn size={15} 
                    style={{marginLeft: 15, color: colors.DARK, backgroundColor: colors.LIGHT}} antIconName='close' onPress={closeModal}/>) : null}
                    
                </View>
                <RoundIconBtn antIconName='bells' style={styles.bells} onPress={handleOnPressBell}/>
             
            </View>
        </Modal>
        
        </>
)}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        width: "100%",
    },
    colorContainer:{
        position: "absolute",
        bottom: 0,
        height: "24%",
        width: "100%",
        backgroundColor: "#FFF",
        zIndex: 2
    },
    input: {
        borderBottomWidth: 2,
        color: colors.PRIMARY,
        fontSize: 20,
        color: colors.DARK,
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    desc: {
        height: 100,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        maxWidth: 100,
        maxHeight: 60,
    },
    ////////////////////////////////
    richTextToolbarStyle: {
        backgroundColor: "#FFF",
    },
    bells:{
        position: 'relative',
        bottom: 0,
        zIndex: 1,
        width: 54,
        maxHeight: 54,
        color: colors.DARK,
        backgroundColor: "#FFF"
    },
    bellText:{
        position: 'relative',
        right: 0,
        bottom: 96,
        fontSize: 20,
        color: colors.PRIMARY,
        marginLeft: "24%",
    },
    paint:{
        position: 'relative',
        bottom: 0,
        zIndex: 1,
        width: 54,
        maxHeight: 54,
        marginLeft: 10,
        backgroundColor: "#fff"
    },
    footer:{
        height: 60,
        width: "100%",
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    
    ////////////////////////////////
})

export default NoteInputModal;

