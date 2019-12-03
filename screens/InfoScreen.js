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
      <View>
        <Text>Email:</Text>
        <Text>Nombre de la empresa:</Text>
        <Text>Puesto:</Text>
        <Text>Horario:</Text>
      </View>
    </ScrollView>
  );
}

InfoScreen.navigationOptions = {
  title: 'Info',
};

