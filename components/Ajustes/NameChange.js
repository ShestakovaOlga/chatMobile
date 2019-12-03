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
import { Logout, getMe } from '../../server';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
//import AvatarSelect from '../components/AvatarSelect'

export default function NameChange(props) {
    const [me] = useGlobal('me')
    const [img, setImg] = useGlobal('img')

    useEffect(() => {
        getMe()
    }, [])

    if (!me) {
        return null
    }
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Image style={{
                width: 60,
                height: 60,
                marginHorizontal: 5,
                borderRadius: 30,
            }} source={{ uri: me.avatar }} />
            {/* <TouchableOpacity onPress={() => {
                    <AvatarSelect value={img} onChange={setImg} />
                }}>
                </TouchableOpacity> */}
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginLeft: 15,
                justifyContent: 'center',
            }} >{me.name}</Text>
        </View>
    );
}


NameChange.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Ajustes')
        }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    title: 'Editar perfil',
});