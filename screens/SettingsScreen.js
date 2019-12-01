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
import { Logout } from '../server';

export default function SettingsScreen(props) {
    return (
        <ScrollView>
            <View style={{ flexGrow: 1 }}>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
                <Text>Aqui va Cambiar el nombre</Text>
            </View>
            <TouchableOpacity onPress={async () => {
                await Logout()
                props.navigation.navigate('Login')
            }}>
                <Text style={{ color: 'red', fontSize: 17 }}>Cerrar la sesión</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}


SettingsScreen.navigationOptions = {
    title: 'Ajustes',
};