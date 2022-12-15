import React, { Component, createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Context (dạng API) để xử lí việc lưu trữ, đọc và ghi các ghi chú giữa các màn hình
const NoteContext = createContext()

const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([])

    const findNotes = async() => {
        const result = await AsyncStorage.getItem('notes');
        if (result !== null) setNotes(JSON.parse(result));
    }

    useEffect(() => {
        findNotes()
    }, [])

    return (
        <NoteContext.Provider value={{notes, setNotes, findNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

// Tạo Hook riêng để sử dụng
export const useNotes = () => useContext(NoteContext)

export default NoteProvider;