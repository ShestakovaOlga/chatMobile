import React, { useState, useEffect, useGlobal, setGlobal } from 'reactn';
import { getMe, sendMessage } from '../server';
import { GiftedChat } from 'react-native-gifted-chat';
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
    TextInput,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import Colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

export default function MessageScreen(props) {
    const [chats, setChats] = useGlobal('chats')
    const [notifications] = useGlobal('notifications')
    const [logged] = useGlobal('logged')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [me] = useGlobal('me')


    const chat = chats.find(chat => chat.ID === activeChat)
    useEffect(() => {
        getMe()
    }, [me])
    useEffect(() => {
        props.navigation.setParams({
            title: chat ? chat.name : 'Chat'
        })
        console.warn(chat.Messages);
    }, [chat])

    return (
        <View style={{
            flex: 1,
            paddingTop: 5,
            backgroundColor: Colors.prinColorLight,
        }} >
            <GiftedChat
                inverted={false}
                messages={chat.Messages}
                onSend={messages => {
                    messages.map(m => {
                        sendMessage(m.text, chat.ID)
                    })
                }}
                user={me}
            />
            {Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={StatusBar.currentHeight * 3} />}
            {/* {chat && me && chat.Messages.map((message) => <View style={{
                backgroundColor: 'white',
                padding: 15,
                borderRadius: 20,
                margin: 10,
                display: 'inline-block',
                alignSelf: me.ID === message.author ? 'flex-end' : 'flex-start'
            }}>
                <Text style={{ color: 'red', fontWeight: 'bold' }}> {getUsername(chats, activeChat, message)}</Text>
                <Text>{message.text}</Text>
            </View>)} */}
        </View>
    );
}

MessageScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <TouchableOpacity onPress={() => {
            setGlobal({ activeChat: false })
            navigation.navigate('Groups')
        }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    headerTitle: () => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Groups')
        }}>
            <Text>{navigation.getParam('title', 'Chat')}</Text>
        </TouchableOpacity>
    ),
    //title: navigation.getParam('title', 'Chat'),
});


function getUsername(chats, activeChat, message) {
    const chat = chats.find(c => c.ID == activeChat)
    const author = chat.members.find(m => m.ID == message.author)
    return author && author.name
}




