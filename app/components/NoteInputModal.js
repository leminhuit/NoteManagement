import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, Modal, Keyboard, StatusBar, TextInput, TouchableWithoutFeedback } from 'react-native'
import colors from '../misc/colors'
import RoundIconBtn from "../components/RoundIconBtn";

// Modal xuất hiện khih ta muốn tạo ra Note mới hoặc Edit Note cũ
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
                <TextInput
                    value={desc}
                    multiline
                    placeholder='Note'
                    style={[styles.input, styles.desc]}
                    onChangeText={text => handleOnChangeText(text, 'desc')}
                />

                <View style={styles.btnContainer}>
                    <RoundIconBtn size={15} antIconName='check' onPress={handleSubmit}/>
                    { title.trim() || desc.trim() ? (<RoundIconBtn size={15} 
                    style={{marginLeft: 15}} antIconName='close' onPress={closeModal}/>) : null}
                </View>
            </View>

            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
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
})

export default NoteInputModal;