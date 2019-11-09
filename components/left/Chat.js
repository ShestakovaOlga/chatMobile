import React, { useGlobal } from 'reactn';
import { AntDesign } from '@expo/vector-icons';
import { chatRead } from '../../server';
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





export default function Chat({ chat, notifications }) {
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [chats] = useGlobal('chats')
    const [gnotifications, setGnotifications] = useGlobal('notifications')


    return <View style={{
        borderRight: '1px solid #E1E1E8',
    }}>
        <View onClick={() => {
            chatRead(chat.ID)
            setActiveChat(chat.ID)
            setGnotifications({
                ...gnotifications,
                [chat.ID]: null
            })
        }} style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: activeChat == chat.ID ? '#815ae6' : 'white',
            color: activeChat == chat.ID ? 'white' : 'black',
            borderBottom: '1px solid #E1E1E8 ',
        }}>
            {chat.avatar ? <View style={{
                width: 30,
                height: 30,
                marginRight: 5,
                marginLeft: 3,
            }}><Image source={{ uri: chat.avatar }} style={{ width: '100%', height: '100%' }} alt="img" /></View> : <AntDesign
                    style={{
                        width: 30,
                        height: 30,
                        marginRight: 5,
                        color: activeChat == chat.ID ? 'white' : '#815ae6',
                    }}
                />}

            <View>
                <Text>{chat.name}</Text>
                {chat.Messages.length > 0 && <View style={{
                    color: '#BDC3C7',//gris claro
                    marginTop: 5
                }}>
                    <Text>{new Date(chat.Messages[chat.Messages.length - 1].UpdatedAt).toLocaleString()}</Text>
                </View>}
            </View>
            {activeChat !== chat.ID && notifications && <View style={{
                width: 13,
                height: 13,
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid gray',
                borderRadius: 99,
                marginBottom: 2,
                padding: 4,
            }}>
                <Text>{notifications}</Text>
            </View>}
            <View style={{
                color: '#815ae6',
            }}>
                <AntDesign />
            </View>
        </View>
    </View >
}