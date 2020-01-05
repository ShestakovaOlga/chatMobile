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
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import AvatarSelect from '../components/AvatarSelect';
import { modifyUser, getChatAvatar, uploadChatAvatar, getAvatar, Users } from '../server';
import { TextInput } from 'react-native-gesture-handler';



export default function MembersGroupInfo(props) {
    const [chats, setChats] = useGlobal('chats')
    const [activeChat, setActiveChat] = useGlobal('activeChat')
    const [users, setUsers] = useGlobal('users')
    const [img, setImg] = useState(null)
    const [me] = useGlobal('me')
    const [selectedUserInfo, setSelectedUserInfo] = useGlobal('selectedUserInfo')


    const chat = chats.find(chat => chat.id === activeChat)
    useEffect(() => {
        props.navigation.setParams({
            title: chat ? chat.name : 'Chat'
        })
        setImg(getChatAvatar(chat.id))
    }, [chat])


    return (
        <ScrollView>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <AvatarSelect allowed={chat.isGroup} onError={() => {
                    setImg(getChatAvatar())
                }} value={img} onChange={(im) => {
                    setImg(im)
                    uploadChatAvatar(im, chat.id)
                }}></AvatarSelect>
                {/*<Entypo name="chat" size={20} color={Colors.prinColor} />*/}
                <Text style={{
                    flex: 1,
                    marginRight: 10,
                }}>{chat.name}</Text>
            </View>
            <FlatList
                data={users.filter(u => u.chats.split(',').map(parseInt).includes(activeChat))}
                renderItem={({ item }) => {
                    return <TouchableOpacity onPress={() => {
                        setSelectedUserInfo(item.id)
                        props.navigation.navigate('NameUserInfo')
                        console.warn('usuarios', item.name);

                    }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                        }}>
                        <Image style={{
                            width: 60,
                            height: 60,
                            marginHorizontal: 5,
                            borderRadius: 30,
                        }} source={getAvatar(item.id)} />
                        <View style={{
                            justifyContent: 'center',
                            flexGrow: 1,
                        }}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                            }} >{item.name}</Text>
                            <Text style={{
                                marginLeft: 20,
                                color: Colors.graylight,
                            }}>{item.role}</Text>
                        </View>
                    </TouchableOpacity>
                }}
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
    title: 'Info del grupo',
});