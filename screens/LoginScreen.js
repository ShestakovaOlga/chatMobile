import * as WebBrowser from 'expo-web-browser';
import React, { useState, useGlobal, useEffect } from 'reactn';
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
import { login } from '../server'
import { MonoText } from '../components/StyledText';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function LoginScreen(props) {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [logged] = useGlobal('logged')

  useEffect(() => {
    if (logged) {
      props.navigation.navigate('Links')
    }
  }, [logged])

  return (
    <View style={{
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.prinColor,
    }}>
      <View style={{
        fontSize: '1rem',
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
          Log in
      </Text>
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
        <TouchableOpacity
          onPress={() => {
            login(mail, password)
          }} style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 7,
            borderColor: Colors.prinColor
          }}>
          <MonoText style={{ color: Colors.prinColor }}>Iniciar sesion</MonoText>
        </TouchableOpacity>
        <Text style={{
          marginTop: 50,
        }} >No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('Signup')
        }}>
          <Text style={{
            color: Colors.prinColor
          }}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}

LoginScreen.navigationOptions = {
  header: null,
};

