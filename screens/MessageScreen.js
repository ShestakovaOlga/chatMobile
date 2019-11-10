import React, { useState, useEffect, useGlobal } from 'reactn';
import Chat from '../components/left/Chat';
import { getMe } from '../server'
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
import Colors from '../constants/Colors';

export default function MessageScreen() {
    const [chats, setChats] = useGlobal('chats')
    const [notifications] = useGlobal('notifications')
    const [logged] = useGlobal('logged')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [me] = useGlobal('me')


    useEffect(() => {
        getMe()
    }, [])
    const chat = chats.find(chat => chat.ID === activeChat)
    return (
        <ScrollView style={{
            flex: 1,
            paddingTop: 5,
            backgroundColor: Colors.prinColorLight,

        }} >
            {chat && me && chat.Messages.map((message) => <View style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 20,
                margin: 10,
                display: 'inline-block',
                alignSelf: me.ID === message.author ? 'flex-end' : 'flex-start'
            }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}> {getUsername(chats, activeChat, message)}</Text>
                <Text style={{}}> {message.text}</Text>
            </View>)}
        </ScrollView>
    );
}

MessageScreen.navigationOptions = {
    title: 'Home',
};

function getUsername(chats, activeChat, message) {
    const chat = chats.find(c => c.ID == activeChat)
    const author = chat.members.find(m => m.ID == message.author)
    return author && author.name
}




