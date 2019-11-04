import React, { useState, useEffect, useGlobal } from 'reactn';
import Chat from '../components/Chat';
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

    useEffect(() => {
        console.log({ notifications });
    }, [notifications])
    useEffect(() => {
        getChats()
    }, [])
    return (
        <ScrollView style={styles.container}>
            <View style={{
                height: '100%',
                overflowY: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                justifyContent: 'flex-end'
            }}>
                {chats.sort((a, b) => {
                    if (a.Messages.length > 0)
                        return new Date(a.Messages[a.Messages.length - 1].UpdatedAt) - new Date(b.Messages[b.Messages.length - 1].UpdatedAt)
                }).map((chat) => <Chat key={chat.ID} chat={chat} notifications={notifications[chat.ID]} />)}
            </View>
        </ScrollView>
    );
}

HomeScreen.navigationOptions = {
    title: 'Home',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});






