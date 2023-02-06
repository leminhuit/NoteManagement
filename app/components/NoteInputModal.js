import React, { Component, useEffect, useRef, useState } from 'react'
import { Text, StyleSheet, View, Modal, Keyboard, StatusBar, TextInput, TouchableWithoutFeedback, ScrollView } from 'react-native'
import colors from '../misc/colors'
import RoundIconBtn from "../components/RoundIconBtn";

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
    
        if (!title.trim() && !desc.trim()) return onClose();

        if (isEdit) {
            console.log("Im here")
            onSubmit(title, desc, Date.now())
        }
        else{
            console.log("Now Im here")
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }
        onClose();
    };
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
        }
    }, [isEdit])


    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'desc') setDesc(text);
    }

    // Xử lý việc tạo mới cũng như update note
    const handleSubmit = () => {
        if (!title.trim() && !desc.trim()) return onClose();

        if (isEdit) {
            onSubmit(title, desc, Date.now())
        }
        else{
            onSubmit(title, desc);
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    // Xử lý việc đóng modal
    const closeModal = () => {
        if (!isEdit) {
            setTitle('');
            setDesc('');
        }
        onClose();
    }

    const handleOpenTimeBells = () =>{
        
    }

    return (
        <>
        <StatusBar hidden/>
        <Modal visible={visible} animationType='fade'>
            <View style={styles.container}>
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

                <ScrollView>
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
                        style={styles.richTextEditorStyle}
                        initialHeight={250}
                    />
                </ScrollView>

                <View style={styles.btnContainer}>
                    <RoundIconBtn size={15} antIconName='check' onPress={submitContentHandle}/>
                    { title.trim() || desc.trim() ? (<RoundIconBtn size={15} 
                    style={{marginLeft: 15}} antIconName='close' onPress={closeModal}/>) : null}
                    
                </View>
            </View>

            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
            <RoundIconBtn antIconName='bells' style={styles.bells} onPress={handleOpenTimeBells}/>
        </Modal>
        </>
)}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
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
        paddingVertical: 15,
    },
    ////////////////////////////////
    richTextEditorStyle: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: "#ccaf9b",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
    },
    richTextToolbarStyle: {
        backgroundColor: "#c6c3b3",
        borderColor: "#c6c3b3",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
    },
    bells:{
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1,
    },
    ////////////////////////////////
})

export default NoteInputModal;