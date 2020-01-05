import React, { useState, useEffect, useGlobal, setGlobal } from 'reactn';
import { getMe, sendMessage, getMessages, getChatAvatar, getAvatar, sendMessageFile } from '../server';
import { GiftedChat } from 'react-native-gifted-chat';
import { Video } from 'expo-av';
import {
    Image,
    Platform,
    Alert,
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
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function MessageScreen(props) {
    const [chats, setChats] = useGlobal('chats')
    const [notifications, setNotifications] = useGlobal('notifications')
    const [messages] = useGlobal('messages')
    const [users] = useGlobal('users')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [me] = useGlobal('me')
    const [chat, setChat] = useState(null)
    const [selectedUserInfo, setSelectedUserInfo] = useGlobal('selectedUserInfo')
    const [attach, setAttach] = useState(null)


    useEffect(() => {
        getMe()
    }, [])
    useEffect(() => {
        if (!chat) {
            const c = chats.find(chat => chat.id === activeChat)
            if (c) {
                setChat(c)
                props.navigation.setParams({
                    title: c.name,
                    id: c.id,
                })
                getMessages(c.id)
                setNotifications({
                    ['chat' + c.id]: null
                })
                const chatUsers = users ? users.filter(u => u.chats.includes(c.id)) : []
                if (!c.isGroup) {
                    props.navigation.setParams({
                        isGroup: false,
                        id: chatUsers.find((u) => {
                            return u.id !== me.id
                        }).id
                    })
                }
            }
        }
    }, [chat, chats])

    return (
        <View style={{
            flex: 1,
            paddingTop: 5,
            backgroundColor: Colors.prinColorLight,
        }} >
            <GiftedChat
                renderActions={() => {
                    return <TouchableOpacity
                        onPress={async () => {
                            const res = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true
                            })

                            if (res.cancelled === false) {
                                let localUri = res.uri;
                                let filename = localUri.split('/').pop();
                                // Infer the type of the image
                                let match = /\.(\w+)$/.exec(filename);
                                let type
                                let kind
                                if (['png', 'jpg', 'jpeg', 'gif'].includes(match[1])) {
                                    type = match ? `image/${match[1]}` : `image`;
                                    kind = 'image'
                                }
                                // if (['mp4', 'webm', 'mov'].includes(match[1])) {
                                //     type = match ? `video/${match[1]}` : `video`;
                                //     kind = 'video'
                                // }
                                if (!type) {
                                    Alert.alert('Error', 'Tipo de archivo no soportado ' + match[1])
                                    return
                                }
                                const file = { uri: localUri, name: filename, type }
                                sendMessageFile(chat.id, file, match[1])
                            }
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            marginBottom: 7,
                            marginLeft: 5
                        }}>
                        <Ionicons name="ios-add-circle-outline" size={30} color={Colors.prinColor} />
                    </TouchableOpacity>
                }}
                // renderMessageVideo={m => {
                //     return <Video source={{ uri: m.currentMessage.video }} shouldPlay style={{
                //         width: 100,
                //         height: 80
                //     }}></Video>
                // }}
                inverted={false}
                messages={messages}
                onSend={messages => {
                    messages.map(m => {
                        sendMessage(m.text, chat.id)
                    })
                }}
                user={me}
                renderUsernameOnMessage={true}
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
        <>
            <TouchableOpacity onPress={() => {
                setGlobal({ activeChat: false })
                navigation.navigate('Groups')
            }}>
                <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
            </TouchableOpacity>

        </>
    ),
    headerTitle: () => (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
            if (navigation.getParam('isGroup', true)) {
                navigation.navigate('Members')
            } else {
                setGlobal({ selectedUserInfo: navigation.getParam('id', '') })
                navigation.navigate('NameUserInfo')
            }
        }}>
            <Image style={{
                width: 40,
                height: 40,
                marginRight: 10,
                borderRadius: 20,
            }} source={navigation.getParam('isGroup', true) ? getChatAvatar(navigation.getParam('id', '')) : getAvatar(navigation.getParam('id', ''))} />
            <Text style={{ fontWeight: 'bold', fontSize: 17, flex: 1 }}>{navigation.getParam('title', 'Chat')}</Text>
        </TouchableOpacity>
    ),
    title: navigation.getParam('title', 'Chat'),
});


function getUsername(chats, activeChat, message) {
    const chat = chats.find(c => c.id == activeChat)
    const author = chat.members.find(m => m.id == message.author)
    return author && author.name
}




