import React, { Component, useEffect, useState } from 'react'
import { Text, StyleSheet, View, StatusBar, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import SearchBar from '../components/SearchBar'
import colors from '../misc/colors'
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../components/Note';
import { useNotes } from '../contexts/NoteProvider';
import NotFound from '../components/NotFound';

const NoteScreen = ({user, navigation }) => {

    const [greet, setGreet] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const {notes, setNotes, findNotes} = useNotes()
    const [searchQuery, setSearchQuery] = useState('')
    const [resultNotFound, setResultNotFound] = useState(false)

    // Sắp xếp các Notes theo trình tự thời gian, cái nào mới nhất sẽ ở trên đầu
    const reverseData = data => {
        return data.sort((a, b) => {
            const aInt = parseInt(a.time);
            const bInt = parseInt(b.time);
            if (aInt < bInt) return 1;
            if (aInt == bInt) return 0;
            if (aInt > bInt) return -1;
        });
    };

    // Tạo lời chào cho App khi người dùng mở app
    const findGreet = () => {
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening')
    }

    // Render lại để hiển thị lời chào với tên người dùng sau khi đã render lần đầu
    useEffect(() => {
        // AsyncStorage.clear()
        findGreet()
    }, [])

    const reverseNotes = reverseData(notes)

    const reverseNotes_Push = reverseNotes.filter(note=>{
        return note.isPushpin === true
    })

    const reverseNotes_NoPush = reverseNotes.filter(note=>{
        return note.isPushpin === false
    })

    // Xử lí việc tạo Note mới và lưu Note đó trong danh sách những Notes đã lưu
    const handleOnSubmit = async (title, desc,date) => {
        const note = {id: Date.now(), title, desc, time: Date.now(),isPushpin: false, date : date };
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes))
    }

    // Mở NoteDetail của Note mình ấn chọn trong màn hình chính
    const openNote = (note) => {
        navigation.navigate('NoteDetail', {note});
    }

    // Hàm xử lý Live Search (search chủ yếu bằng tiêu đề của Note)
    const handleOnSeachInput = async (text) => {
        setSearchQuery(text);

        if (!text.trim()) {
            setSearchQuery('')
            setResultNotFound(false);
            return await findNotes()
        }

        const filteredNotes = notes.filter(note => {
            if (note.title.toLowerCase().includes(text.toLowerCase()))
                return note;
        })

        if (filteredNotes.length){
            setNotes([...filteredNotes])
        }
        else{
            setResultNotFound(true);
        }
    }

    // Xử lí việc ấn nút X (Clear) bên cạnh thanh tìm kiếm
    const handleOnClear = async () => {
        setSearchQuery('')
        setResultNotFound(false)
        await findNotes()
    }
    const handleOnPressPush = async(note)=>{
        const result = await AsyncStorage.getItem('notes')
        let notes = []
        if (result !== null) notes = JSON.parse(result)

        const newNotes = notes.filter(n => {
            if (n.id === note.id) {
            if(n.isPushpin===false){
                n.isPushpin = true
            }
            else{
                n.isPushpin = false
            }
        }
            return n;
        })
        setNotes(newNotes)
        await AsyncStorage.setItem('notes', JSON.stringify(newNotes))
    }

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>{`Good ${greet}, ${user.name}`}</Text>

                    {/* Nếu có ghi chú trong AStorage thì hiển thị thanh Search Bar */}
                    {notes.length ? (
                        <SearchBar value={searchQuery} onChangeText={handleOnSeachInput} 
                        containerStyle={{marginVertical: 15}}
                        onClear={handleOnClear}/>
                    ) : null}

                    {/* Nếu không có note có tên đó trong dữ liệu thì render màn hình không tìm thấy
                    , ngược lại render kết quả */}
                    {resultNotFound? <NotFound/> : 
                        <View >
                            {Object.entries(reverseNotes_Push).length !== 0 ? <Text> Được ghim </Text> : null}
                            
                            <FlatList data={reverseNotes_Push} numColumns={2} 
                            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}} 
                            keyExtractor={item => item.id.toString()}
                            renderItem={({item}) => <Note onPress={() => openNote(item)} item = {item} onPressPush={()=>handleOnPressPush(item)}/>}/>

                             {Object.entries(reverseNotes_NoPush).length !== 0 ? <Text> Khác </Text> : null} 
                            <FlatList data={reverseNotes_NoPush} numColumns={2} 
                            columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 15}} 
                            keyExtractor={item => item.id.toString()} 
                            
                            renderItem={({item}) => <Note onPress={() => openNote(item)} item = {item} onPressPush={()=>handleOnPressPush(item)}/>} />
                        </View>
                    }

                    {!notes.length ? 
                    (<View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                        <Text style={styles.emptyHeader}>Add Notes</Text>
                    </View>) : null}

                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn onPress={() => setModalVisible(true)} antIconName='plus' style={styles.addBtn}/>

            <NoteInputModal visible={modalVisible} 
            onClose={() => setModalVisible(false)}
            onSubmit={handleOnSubmit}/>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    container: {
        paddingHorizontal: 20,
        flex: 1,
        zIndex: 1,
    },
    emptyHeader: {
        fontSize: 30,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    addBtn: {
        position: 'absolute',
        right: 15,
        bottom: 50,
        zIndex: 1,
    },
})

export default NoteScreen;
