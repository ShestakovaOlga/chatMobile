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
import Colors from '../constants/Colors';
import Contact from '../components/Contact';
import { Users, CreateGroup } from '../server';
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';


export default function SelectContactScreen(props) {
    const [users, setUsers] = useGlobal('users')
    const [selected, setSelected] = useState([])
    const [chatname, setChatname] = useState('')

    useEffect(() => {
        Users()
    }, [])

    const disabled = selected.length === 0 || (selected.length > 1 && chatname === '')

    return <View>
        {selected.length >= 1 && <View
            style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}>

            {selected.length >= 2 && <TextInput style={{
                width: '100%',
                height: 40,
                borderBottomWidth: 1,
                borderBottomColor: Colors.prinColorLight,
                padding: 5,
            }} onChangeText={(value) => {
                setChatname(value)
            }} placeholder='Nombre del grupo' value={chatname} />}

            <TouchableOpacity style={{
                width: '100%',
                height: 30,
                borderRadius: 30,
                backgroundColor: disabled ? 'gray' : '#815ae6',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
            }} disabled={disabled} onPress={() => {
                CreateGroup(chatname === '' ? users.find((user) => user.email === selected[0]).name : chatname, selected)
                props.navigation.navigate('Groups')
            }}>
                <Text style={{ color: 'white' }}>Crear</Text>
            </TouchableOpacity>
        </View>}

        {users.map((user) => <Contact key={user.id} onChange={(checked) => {
            if (checked) {
                setSelected([
                    ...selected,
                    user.email
                ])
            } else {
                setSelected(selected.filter(email => email !== user.email))
            }
        }} checked={selected.includes(user.email)} {...user} />)}
    </View>
}
SelectContactScreen.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Groups')
        }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    title: 'Contacts'
});