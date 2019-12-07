import React, { useState, useEffect, useGlobal } from 'reactn';
import * as WebBrowser from 'expo-web-browser';
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
    Switch
} from 'react-native';
import Colors from '../constants/Colors';
import Checkbox from './Checkbox'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAvatar } from '../server';

export default function Contact(props) {
    return <View style={{ marginVertical: 15 }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: '#F4F4F5',
        }}>

            <View style={{
                width: 50,
                marginRight: 5,
                color: '#815ae6',
            }}>
                <Image style={{
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    margin: 5
                }} source={getAvatar(props.id)} alt="img" />
            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                flex: 1,
            }}>
                <View>
                    <Text style={{
                        marginLeft: 20,
                        fontWeight: 'bold',
                        fontSize: 17
                    }}>{props.name}</Text>
                    <Text style={{
                        marginLeft: 20,
                        color: Colors.graylight,
                    }}>{props.role}</Text>
                </View>
            </View>
            <Checkbox onChange={props.onChange} checked={props.checked}
            />
        </View>
    </View>
}