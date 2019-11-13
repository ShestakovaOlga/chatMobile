import React, { useState, useEffect, useGlobal } from 'reactn';
import Chat from '../components/left/Chat';
import { getChats } from '../server';
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

export default function GroupsScreen(props) {
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
            <FlatList
                data={chats}
                renderItem={({ item }) => <TouchableOpacity onPress={() => {
                    setActiveChat(item.ID)
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
                        }} source={{ uri: item.avatar }} />
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
                        <MaterialIcons name="keyboard-arrow-right" size={32} color='#BDC3C7' />
                    </View>
                </TouchableOpacity>}
                keyExtractor={(chat) => 'chat' + chat.ID}
            >
            </FlatList>
        </ScrollView>
    );
}

GroupsScreen.navigationOptions = {
    headerRight: (
        <TouchableOpacity>
            <AntDesign style={{
                marginRight: 5,
                transform: [{ rotate: '90deg' }]
            }} name="select1" size={23} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    title: 'Groups'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: '#fff',
    },
});






