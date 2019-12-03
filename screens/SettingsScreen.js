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
import Colors from '../constants/Colors';
import { Logout, getMe } from '../server';
import AvatarSelect from '../components/AvatarSelect'

export default function SettingsScreen(props) {
    const [me] = useGlobal('me')
    const [img, setImg] = useGlobal('img')

    useEffect(() => {
        getMe()
    }, [])

    if (!me) {
        return null
    }
    return (
        <ScrollView style={{
            backgroundColor: Colors.prinColorLight,
            height: '100%',
            padding: 2,
        }}>
            <TouchableOpacity onPress={() => {
                props.navigation.navigate('NameChange')
            }} style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                {/* <TouchableOpacity onPress={() => {
                    <AvatarSelect value={img} onChange={setImg} />
                }}>
                </TouchableOpacity> */}
                <Image style={{
                    width: 60,
                    height: 60,
                    marginHorizontal: 5,
                    borderRadius: 30,
                }} source={{ uri: me.avatar }} />
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    justifyContent: 'center',
                }} >{me.name}</Text>
            </TouchableOpacity>
            <View style={{
                backgroundColor: 'white',
                marginVertical: 5,
                marginTop: 25,
                padding: 4,
                height: 65,
            }}>
                <Text style={{
                    fontSize: 17,
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.prinColorLight,
                }} >Email: {me.email}</Text>

            </View>
            <View style={{
                backgroundColor: 'white',
                marginVertical: 5,
                marginTop: 25,
                padding: 4,
                height: 65,
            }}>
                <TouchableOpacity onPress={async () => {
                    await Logout()
                    props.navigation.navigate('Login')
                }}>
                    <Text style={{ color: 'red', fontSize: 17 }}>Cerrar la sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


SettingsScreen.navigationOptions = {
    title: 'Ajustes',
};