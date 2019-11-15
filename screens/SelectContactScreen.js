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
import { Users } from '../server';
import { MaterialIcons } from '@expo/vector-icons';


export default function SelectContactScreen(props) {
    const [users, setUsers] = useGlobal('users')
    const [selected, setSelected] = useState([])

    useEffect(() => {
        Users()
    }, [])

    return <View>
        {users.map((user) => <Contact key={user.ID} onChange={(checked) => {
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