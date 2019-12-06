import React, { useState, useGlobal, useEffect } from 'reactn';
import { getMe } from '../server';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InputEvent,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Calendar } from 'react-native-calendars';


export default function InfoScreen() {
  const [me] = useGlobal('me')
  const [img, setImg] = useGlobal('img')
  const [showSelectimg, setShowSelectimg] = useGlobal('showSelectimg')
  const [showSettings, setShowSettings] = useGlobal('showSettings')

  useEffect(() => {
    getMe()
  }, [])

  if (!me) {
    return null
  }

  return (
    <ScrollView style={{
      flex: 1,
      paddingTop: 15,
      backgroundColor: '#fff',
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.prinColorLight,
        marginBottom: 15,
        backgroundColor: Colors.prinColorLight,
      }}>
        <Image style={{
          width: 60,
          height: 60,
          marginHorizontal: 5,
          borderRadius: 30,
        }} source={{ uri: me.avatar }} />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 15,
          justifyContent: 'center',
        }} >{me.name}</Text>
      </View>

      <View >
        <View style={{
          flexDirection: 'row',
        }}>
          <Text style={{ fontSize: 16, }}>Email:</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>{me.email}</Text>
        </View>
        <View style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 50,
          borderBottomWidth: 1,
          borderBottomColor: Colors.prinColorLight,
        }}></View>
        <View style={{
          flexDirection: 'row',
        }}>
          <Text>Empresa:</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}> {me.company}</Text>
        </View>
        <View style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 50,
          borderBottomWidth: 1,
          borderBottomColor: Colors.prinColorLight,
        }}></View>
        <View style={{
          flexDirection: 'row',
        }}>
          <Text>Puesto:</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}> {me.role}</Text>
        </View>
        <View style={{
          marginTop: 10,
          marginBottom: 10,
          marginLeft: 50,
          borderBottomWidth: 1,
          borderBottomColor: Colors.prinColorLight,
        }}></View>

        <View style={{
          flexDirection: 'row',
        }}>
          <Text>Horario:</Text>
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>De Lun a Vie, 8:00 - 15:00</Text>
        </View>
        <Calendar />
      </View>
    </ScrollView>
  );
}

InfoScreen.navigationOptions = {
  title: 'Info',
};

