import React, { useState, useGlobal, useEffect } from 'reactn';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent,
} from 'react-native';
import { Logout, getMe, Users, getAvatar } from '../../server';
import { MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';


export default function NameUserInfo(props) {
    const [me] = useGlobal('me')
    const [users] = useGlobal('users')
    const [selectedUserInfo, setSelectedUserInfo] = useGlobal('selectedUserInfo')

    useEffect(() => {
        Users()
        console.warn('users', users);

    }, [])
    const user = users.find((u) => {
        return u.id === selectedUserInfo
    })
    const viewTextStyle = {
        flexDirection: 'row',
        marginLeft: 3,
        alignItems: 'center',

    }
    return (
        <View >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Image style={{
                    width: 60,
                    height: 60,
                    marginHorizontal: 5,
                    borderRadius: 30,
                }} source={getAvatar(user.id)} />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 15,
                    justifyContent: 'center',
                }} >{user.name}</Text>
            </View>
            <View style={viewTextStyle}>
                <Entypo name="email" size={20} color={Colors.prinColor} />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 10,
                }}>{user.email}</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                marginLeft: 3,
                alignItems: 'center'
            }}>
                <Ionicons name="ios-people" size={27} color={Colors.companyIcon} />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 10,
                }}> {user.company}</Text>
            </View>

            <View style={viewTextStyle}>
                <MaterialIcons name="person-pin" size={25} color={Colors.roleIcon} />
                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginLeft: 10,
                }}> {user.role}</Text>
            </View>
        </View>
    );
}


NameUserInfo.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Chat')
        }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    title: 'Ver perfil',
});