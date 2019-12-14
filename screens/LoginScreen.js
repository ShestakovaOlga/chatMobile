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
import { FontAwesome } from '@expo/vector-icons';
import { Updates } from 'expo'

export default function LoginScreen(props) {
  const [mail, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [logged] = useGlobal('logged')
  const [loginerror, setLoginerror] = useGlobal('loginerror')
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync()
          setTimeout(() => {
            Updates.reloadFromCache()
          }, 1500)
        }
      } catch (e) {
        // handle or log error
      }
    })()
  }, [])
  useEffect(() => {
    if (logged) {
      props.navigation.navigate('Groups')
      setLoginerror('')
    }
  }, [logged])

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
          Iniciar sesión
      </Text>
        <TextInput
          onChangeText={(value) => {
            setMail(value)
          }} style={{
            width: '100%',
            height: 40,
            borderColor: 'gray',
            borderBottomWidth: 1,
            margin: 15
          }}
          autoCapitalize='none'
          placeholder='Email'
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
              margin: 15
            }}
            placeholder='Contraseña'
            autoComplete='password'
            value={password}
            secureTextEntry={!showPassword}>
          </TextInput>
        </View>
        {loginerror !== '' && <Text style={{ color: 'red', marginBottom: 10, fontSize: 17 }}>{loginerror}</Text>}
        <TouchableOpacity
          onPress={() => {
            login(mail, password)
          }} style={{
            borderWidth: 1,
            padding: 5,
            borderRadius: 7,
            borderColor: Colors.prinColor
          }}>
          <MonoText style={{ color: Colors.prinColor }}>Iniciar sesión</MonoText>
        </TouchableOpacity>
        <Text style={{
          marginTop: 50,
        }} >No tienes cuenta?</Text>
        <TouchableOpacity onPress={() => {
          props.navigation.navigate('Signup')
          setLoginerror('')
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

