import React, { useState, useGlobal, useEffect } from 'reactn';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent,
    FlatList
} from 'react-native';
import Colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';



export default function MembersGroupInfo(props) {
    const [chats, setChats] = useGlobal('chats')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [users, setUsers] = useGlobal('users')

    const chat = chats.find(chat => chat.id === activeChat)
    useEffect(() => {
        props.navigation.setParams({
            title: chat ? chat.name : 'Chat'
        })
    }, [chat])
    return (
        <ScrollView>
            <FlatList
                data={users}
                renderItem={({ item }) => <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                }}>
                    <Image style={{
                        width: 60,
                        height: 60,
                        marginHorizontal: 5,
                        borderRadius: 30,
                    }} source={{ uri: item.avatar }} />
                    <View style={{
                        justifyContent: 'center',
                        flexGrow: 1,
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                        }} >{item.name}</Text>
                    </View>
                </View>}
            >
            </FlatList>
        </ScrollView>
    );
}


MembersGroupInfo.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <TouchableOpacity onPress={() => {
            // setGlobal({ activeChat: false })
            navigation.navigate('Chat')
        }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    title: navigation.getParam('title', ''),
});