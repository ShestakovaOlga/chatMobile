import React, { useState, useGlobal, useEffect } from 'reactn';
import { getMe, getAvatar } from '../server';
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  InputEvent,
  Modal
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Calendar, Agenda } from 'react-native-calendars';
import { MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { BackdropContext, TimePicker } from 'react-native-propel-kit';



export default function InfoScreen() {
  const [me] = useGlobal('me')
  const [img, setImg] = useGlobal('img')
  const [showSelectimg, setShowSelectimg] = useGlobal('showSelectimg')
  const [showSettings, setShowSettings] = useGlobal('showSettings')
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const [selectedTimeStart, setSelectedTimeStart] = useState(new Date());
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(new Date());

  useEffect(() => {
    getMe()
  }, [])

  if (!me) {
    return null
  }
  const lineViewStyle = {
    marginTop: 5,
    marginBottom: 30,
    marginLeft: 35,
    borderBottomWidth: 1,
    borderBottomColor: Colors.prinColorLight,
  }
  const viewTextStyle = {
    flexDirection: 'row',
    marginLeft: 3,
    alignItems: 'center'
  }
  const timePickerStyle = {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center'
  }
  const viewTimeStyle = {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.prinColorLight,
    justifyContent: 'space-between'
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
        marginBottom: 25,
      }}>
        <Image style={{
          width: 60,
          height: 60,
          marginHorizontal: 5,
          borderRadius: 30,
        }} source={getAvatar(me.id)} />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginLeft: 15,
          justifyContent: 'center',
        }} >{me.name}</Text>
      </View>

      <View >
        <View style={viewTextStyle}>
          <Entypo name="email" size={20} color={Colors.prinColor} />
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>{me.email}</Text>
        </View>
        <View style={lineViewStyle}></View>
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
          }}> {me.company}</Text>
        </View>
        <View style={lineViewStyle}></View>
        <View style={viewTextStyle}>
          <MaterialIcons name="person-pin" size={25} color={Colors.roleIcon} />
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}> {me.role}</Text>
        </View>
        <View style={lineViewStyle}></View>

        <View style={viewTextStyle}>
          <AntDesign name="clockcircleo" size={20} color={Colors.workhoursIcon} />
          <Text style={{
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 10,
          }}>De Lun a Vie, 8:00 - 15:00</Text>
        </View>
        <View style={{
          ...lineViewStyle,
          marginLeft: 3,
        }}></View>

        <Calendar
          onDayPress={(day) => {
            setSelectedDay(day)
            setModalVisible(true)
            console.warn('selected day', day)
          }}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}

        >
          <TouchableOpacity style={{
            position: 'absolute',
            left: 5,
            top: 35
          }} onPress={() => { setModalVisible(false) }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
          </TouchableOpacity>

          <TouchableOpacity style={{
            position: 'absolute',
            right: 10,
            top: 40
          }} onPress={() => { setModalVisible(false) }}><Text style={{
            fontWeight: 'bold',
            marginRight: 5,
            color: Colors.prinColor
          }}>Guardar</Text>
          </TouchableOpacity>

          <View style={{
            marginTop: 80,
            alignItems: 'center'
          }}>

            <Text style={{ fontSize: 17 }}>Fecha elegida: {selectedDay.day}/{selectedDay.month}/{selectedDay.year}</Text>


            <View style={viewTimeStyle}>
              <Text style={{
                fontSize: 18,
                marginLeft: 10
              }}>Elige hora de inicio</Text>
              <TimePicker style={timePickerStyle} title="Pick a time" value={selectedTimeStart} onChange={setSelectedTimeStart} />

            </View>

            <View style={viewTimeStyle}>
              <Text style={{
                fontSize: 18,
                marginLeft: 10
              }}>Elige hora de fin</Text>
              <TimePicker style={timePickerStyle} title="Pick a time" value={selectedTimeEnd} onChange={setSelectedTimeEnd} />
            </View>
          </View>

        </Modal>
      </View>
    </ScrollView>
  );
}

InfoScreen.navigationOptions = {
  title: 'Info',
};

