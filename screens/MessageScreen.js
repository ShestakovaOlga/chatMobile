import React, { useState, useEffect, useGlobal, setGlobal } from 'reactn';
import { getMe, sendMessage, getMessages } from '../server';
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
    const [messages] = useGlobal('messages')
    const [logged] = useGlobal('logged')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [me] = useGlobal('me')
    const [chat, setChat] = useState(null)

    useEffect(() => {
        console.warn('messages', messages);
    }, [messages])

    useEffect(() => {
        getMe()
    }, [])
    useEffect(() => {
        if (!chat) {
            const c = chats.find(chat => chat.id === activeChat)
            setChat(c)
            props.navigation.setParams({
                title: chat ? chat.name : 'Chat'
            })
            console.warn("C", chats);
            getMessages(c.id)
        }
    }, [chat])

    return (
        <View style={{
            flex: 1,
            paddingTop: 5,
            backgroundColor: Colors.prinColorLight,
        }} >
            <GiftedChat
                inverted={false}
                messages={messages}
                onSend={messages => {
                    messages.map(m => {
                        sendMessage(m.text, chat.id)
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
            navigation.navigate('Members')
        }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, }}>{navigation.getParam('title', 'Chat')}</Text>
        </TouchableOpacity>
    ),
    //title: navigation.getParam('title', 'Chat'),
});


function getUsername(chats, activeChat, message) {
    const chat = chats.find(c => c.id == activeChat)
    const author = chat.members.find(m => m.id == message.author)
    return author && author.name
}




