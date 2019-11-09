import React, { useState, useEffect, useGlobal } from 'reactn';
import '../css/style'
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
    CheckBox
} from 'react-native';

export function Contact(props) {


    return <View>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottom: '1px solid #F4F4F5',
            width: '100%'
        }}>

            {props.avatar ? <View style={{
                width: 50,
                marginRight: 5,
                color: '#815ae6',
            }}>
                <Image style={{ width: '100%', height: '100%' }} source={props.avatar} alt="img" />
            </View> : <Text>Icono</Text>}

            <View style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}>
                <View style={{ flex: 3 }}>
                    <Text style={{
                        marginRight: 20,
                    }}>{props.name}</Text>
                    <Text style={{
                        fontSize: '0.7rem',
                    }}>{props.date}</Text>
                </View>
                <View style={{
                    color: '#BDC3C7',//gris claro
                    fontSize: '0.9rem',
                    marginTop: 5
                }}> <Text>Last message</Text> </View>
            </View>
            <CheckBox onValueChange={props.onChange} type="checkbox" value={props.value} />
        </View>
    </View>
}