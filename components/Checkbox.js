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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';


export default function Checkbox(props) {
    return <TouchableOpacity onPress={() => {
        props.onChange(!props.checked)
        console.warn(props.checked);

    }} style={{
        width: 35,
        height: 35,
        marginRight: 8,
    }}>
        {props.checked === true ? <MaterialCommunityIcons name="checkbox-marked" size={27} color={Colors.prinColor} /> :
            <MaterialCommunityIcons name="checkbox-blank-outline" size={30} color={Colors.prinColorLight} />
        }
    </TouchableOpacity>
}