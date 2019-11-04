import React, { useGlobal } from 'reactn';
import { AntDesign } from '@expo/vector-icons';
import { chatRead } from '../server';
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
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #E1E1E8',
        overflowY: 'scroll',
        width: '100%',
        fontFamily: "'Roboto', sans-serif",
    }}>
        <View onClick={() => {
            chatRead(chat.ID)
            setActiveChat(chat.ID)
            setGnotifications({
                ...gnotifications,
                [chat.ID]: null
            })
        }} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: activeChat == chat.ID ? '#815ae6' : 'white',
            color: activeChat == chat.ID ? 'white' : 'black',
            // borderBottom: '1px solid #E1E1E8 ',
            cursor: 'pointer',
        }}>
            {chat.avatar ? <View style={{
                width: 50,
                height: 60,
                marginRight: 5,
                marginLeft: 3,
            }}><Image style={{ width: '100%', height: '100%' }} src={chat.avatar} alt="" /></View> : <AntDesign
                    style={{
                        width: 50,
                        height: 50,
                        marginRight: 5,
                        color: activeChat == chat.ID ? 'white' : '#815ae6',
                    }}
                />}

            <View style={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                padding: 5,
            }}>{chat.name}

                {chat.Messages.length > 0 && <View style={{
                    color: '#BDC3C7',//gris claro
                    fontSize: '0.9rem',
                    marginTop: 5
                }}> {new Date(chat.Messages[chat.Messages.length - 1].UpdatedAt).toLocaleString()}
                </View>}
            </View>
            {activeChat !== chat.ID && notifications && <View style={{
                width: 13,
                height: 13,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid gray',
                borderRadius: 100,
                marginBottom: 2,
                padding: 4,
                fontSize: '0.8rem'
            }}><View>{notifications}</View></View>}
            <View style={{
                color: '#815ae6',
                fontSize: '1.2rem',
            }}><AntDesign /></View>
        </View>
    </View >
}