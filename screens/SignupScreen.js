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
import AvatarSelect from '../components/AvatarSelect';
import { FontAwesome } from '@expo/vector-icons';

export default function SignupScreen(props) {
    const [fullname, setFullname] = useGlobal('fullname')
    const [mail, setMail] = useGlobal('mail')
    const [password, setPassword] = useGlobal('password')
    const [registererror, setRegistererror] = useGlobal('registererror')
    const [showPassword, setShowPassword] = useState(false)

    const eyeStyle = {
        position: 'absolute',
        right: 7,
        height: 25,
        width: 40,
        padding: 2,
        alignItems: 'center',
        zIndex: 10,
    }

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
                height: '75%',
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
                    Registrarse
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
                    autoComplete='email'
                    value={mail}>
                </TextInput>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={eyeStyle} onPress={() => {
                        setShowPassword(!showPassword)
                    }}>
                        {!showPassword ? <FontAwesome name="eye-slash" size={19} color={Colors.prinColor} /> :
                            <FontAwesome name="eye" size={19} color={Colors.prinColor} />}
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={(value) => {
                            setPassword(value)
                        }} style={{
                            width: '100%',
                            height: 40,
                            borderColor: 'gray',
                            borderBottomWidth: 1,
                        }}
                        placeholder='Contraseña'
                        autoComplete='password'
                        secureTextEntry={!showPassword}
                        value={password}>
                    </TextInput>
                </View>
                {registererror !== '' && <Text style={{ color: 'red' }}>{registererror}</Text>}
                <TouchableOpacity
                    onPress={() => {
                        sendSignup(fullname, mail, password)
                        props.navigation.navigate('Login')
                        setRegistererror('')
                        setFullname('')
                        setMail('')
                        setPassword('')
                    }} style={{
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 7,
                        borderColor: Colors.prinColor,
                        marginTop: 10,
                    }}>
                    <MonoText style={{ color: Colors.prinColor }}>Registrarse</MonoText>
                </TouchableOpacity>
                <Text style={{
                    marginTop: 50,
                }} >Tienes cuenta?</Text>
                <TouchableOpacity onPress={() => {
                    setRegistererror('')
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

