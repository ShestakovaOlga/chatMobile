import React, { useState, useEffect, useGlobal } from 'reactn';
import Chat from '../components/left/Chat';
import { getChats } from '../server'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent,
    Button,
} from 'react-native';

export default function HomeScreen() {
    const [chats, setChats] = useGlobal('chats')
    const [notifications] = useGlobal('notifications')
    const [logged] = useGlobal('logged')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [showMenu, setShowMenu] = useGlobal('showMenu')


    useEffect(() => {
        getChats()
    }, [])
    return (
        <ScrollView style={styles.container}>

        </ScrollView>
    );
}

HomeScreen.navigationOptions = {
    title: 'Home',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#fff',
    },
});






