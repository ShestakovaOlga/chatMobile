import React, { useState, useEffect, useGlobal, setGlobal } from 'reactn';
import { getChats, Logout, pushToken, uploadChatAvatar, getChatAvatar, getAvatar, Users, getMe } from '../server';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
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
    FlatList,
} from 'react-native';
import { chatTime } from "../constants/Date";
import Colors from '../constants/Colors';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default function GroupsScreen(props) {
    const [chats, setChats] = useGlobal('chats')
    const [notifications] = useGlobal('notifications')
    const [logged] = useGlobal('logged')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [showMenu, setShowMenu] = useGlobal('showMenu')
    const [users] = useGlobal('users')
    const [me] = useGlobal('me')

    useEffect(() => {
        getMe()
        Users()
        if (activeChat) {
            props.navigation.navigate('Chat')
        }
    }, [activeChat])

    useEffect(() => {
        (async () => {
            getChats()
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            );
            let finalStatus = existingStatus;
            // only ask if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            if (existingStatus !== 'granted') {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }

            // Stop here if the user did not grant permissions
            if (finalStatus !== 'granted') {
                console.warn('no hay permisos de notific')
                return;
            }

            // Get the token that uniquely identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            pushToken(token)
        })()
        Notifications.addListener((notification) => {
            console.warn(notification.data);

            setActiveChat(notification.data.chatId)
            props.navigation.navigate('Chat')
        });
    }, [])

    return (
        <ScrollView style={styles.container}>
            <FlatList
                data={chats}
                renderItem={({ item }) => {
                    const chatUsers = users ? users.filter(u => u.chats.includes(item.id)) : []
                    console.warn('chatUsers', JSON.stringify(item, null, 2));

                    return (<TouchableOpacity onPress={() => {
                        setActiveChat(item.id)
                        props.navigation.navigate('Chat')
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                        }}>
                            <Image style={{
                                width: 60,
                                height: 60,
                                marginHorizontal: 5,
                                borderRadius: 30,
                            }} source={item.isGroup ? getChatAvatar(item.id) : getAvatar(chatUsers.find((u) => {
                                return u.id !== me.id
                            }).id)} />
                            <View style={{
                                justifyContent: 'center',
                                flexGrow: 1,
                            }}>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }} >{item.name}</Text>
                                <Text style={{
                                    fontSize: 15,
                                    color: '#BDC3C7',
                                }}>{chatTime(item)}</Text>
                            </View>
                            {/* <Text>Notificacion de mens nuevos</Text> */}
                            <MaterialIcons name="keyboard-arrow-right" size={32} color='#BDC3C7' />
                        </View>
                    </TouchableOpacity>)
                }}
                keyExtractor={(chat) => 'chat' + chat._id}
            >
            </FlatList>
        </ScrollView>
    );
}

GroupsScreen.navigationOptions = ({ navigation }) => ({
    headerRight: (
        <TouchableOpacity onPress={() => {
            setGlobal({ showContacts: true })
            navigation.navigate('Contacts')
        }}>
            <AntDesign style={{
                marginRight: 15,
                transform: [{ rotate: '90deg' }]
            }} name="select1" size={23} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    title: navigation.getParam('title', 'Groups')
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#fff',
    },
});






