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
import { TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import { sendComment } from '../server'


export default function FormContact(props) {
    const [opinion, setOpinion] = useState('')

    useEffect(() => {
        props.navigation.setParams({
            opinion
        })
    }, [opinion])

    return (
        <View style={{ height: '100%' }}>
            <TextInput onChangeText={setOpinion} style={{
                padding: 5,
                flex: 1,
                fontSize: 18
            }} textAlignVertical='top' multiline numberOfLines={50} value={opinion} placeholder='Escribe tu comentario'></TextInput>
        </View>
    );
}



FormContact.navigationOptions = ({ navigation }) => ({
    headerLeft: (
        <TouchableOpacity onPress={() => {
            // setGlobal({ activeChat: false })
            navigation.navigate('Groups')
        }}>
            <MaterialIcons name="keyboard-arrow-left" size={32} color={Colors.prinColor} />
        </TouchableOpacity>
    ),
    headerRight: (
        <TouchableOpacity onPress={() => {
            sendComment(navigation.getParam('opinion', ''))
            navigation.navigate('Groups')
        }} style={{
            height: 30,
            padding: 5,
            borderRadius: 10,
            alignItems: 'center',
            marginRight: 5
        }}>
            <Text style={{ color: Colors.prinColor, fontSize: 17 }}>Enviar</Text>
        </TouchableOpacity>
    ),
    title: 'Contacta con nosotros',
});