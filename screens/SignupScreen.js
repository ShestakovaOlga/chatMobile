import * as WebBrowser from 'expo-web-browser';
import React, { useState, useGlobal, useEffect } from 'reactn';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent,
} from 'react-native';
import { sendSignup } from '../server'
import { MonoText } from '../components/StyledText';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import AvatarSelect from '../components/AvatarSelect'

export default function SignupScreen(props) {
    const [fullname, setFullname] = useGlobal('fullname')
    const [mail, setMail] = useGlobal('mail')
    const [password, setPassword] = useGlobal('password')
    const [img, setImg] = useGlobal('img')

    return (
        <View style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.prinColor,
        }}>
            <View style={{
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 15,
                shadowColor: '#fff',
                height: '60%',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 8,
                },
                shadowOpacity: 0.4,
                shadowRadius: 10.32,
                elevation: 16,
                padding: 10,
                backgroundColor: '#fff',
            }}>
                <Text style={{
                    fontSize: 25,
                }}>
                    Sign up
                </Text>
                <TextInput
                    onChangeText={(value) => {
                        setFullname(value)
                    }} style={{
                        width: '100%',
                        height: 40, borderColor: 'gray',
                        borderBottomWidth: 1,
                        margin: 15
                    }}
                    autoCapitalize='none'
                    placeholder='Nombre'
                    textContentType='username'
                    autoComplete='username'
                    value={fullname}>
                </TextInput>
                <TextInput
                    onChangeText={(value) => {
                        setMail(value)
                    }} style={{
                        width: '100%',
                        height: 40, borderColor: 'gray',
                        borderBottomWidth: 1,
                        margin: 15
                    }}
                    autoCapitalize='none'
                    placeholder='Email'
                    textContentType='mail'
                    autoComplete='mail'
                    value={mail}>
                </TextInput>
                <TextInput
                    onChangeText={(value) => {
                        setPassword(value)
                    }} style={{
                        width: '100%',
                        height: 40,
                        borderColor: 'gray',
                        borderBottomWidth: 1,
                        margin: 15
                    }}
                    placeholder='Contraseña'
                    textContentType='password'
                    autoComplete='password'
                    secureTextEntry
                    value={password}>
                </TextInput>
                <AvatarSelect value={img} onChange={setImg} />
                <TouchableOpacity
                    onPress={() => {
                        sendSignup(fullname, mail, password, img)
                        props.navigation.navigate('Login')
                        setFullname('')
                        setMail('')
                        setPassword('')
                    }} style={{
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 7,
                        borderColor: Colors.prinColor
                    }}>
                    <MonoText style={{ color: Colors.prinColor }}>Registrarse</MonoText>
                </TouchableOpacity>
                <Text style={{
                    marginTop: 50,
                }} >Tienes cuenta?</Text>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate('Login')
                }}>
                    <Text style={{
                        color: Colors.prinColor
                    }}>
                        Iniciar sesion
                </Text>
                </TouchableOpacity>
            </View>


        </View>
    );
}

SignupScreen.navigationOptions = {
    header: null,
};

