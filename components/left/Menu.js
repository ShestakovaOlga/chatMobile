import React, { useState, useGlobal } from 'reactn';
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

export function Menu(props) {
    const [showContacts, setShowContacts] = useGlobal('showContacts')

    return <View style={{
        justifyContent: 'space-between',
        flexDirection: showContacts ? 'row' : 'row-reverse',
        height: 50,
        border: '1px solid #F4F4F5',
    }}>
        {showContacts && <Button onClick={() => {
            setShowContacts(false)
        }} style={{
            color: '#815ae6',
            fontSize: '1.2rem',
            backgroundColor: '#FFFFFF',
            cursor: 'pointer',
            outline: 'none',
            border: 'none'
        }}>></Button>}

        <Button onClick={() => {
            setShowContacts(true)
        }}
            style={{
                color: '#815ae6',
                backgroundColor: '#FFFFFF',
                outline: 'none',
                border: 'none'
            }}>x</Button>
    </View>
}