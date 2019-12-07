import React, { useGlobal, useEffect } from 'reactn';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent,
} from 'react-native';
import { avatar } from '../server';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Colors from '../constants/Colors';

export default function AvatarSelect({ onChange, value }) {
    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Lo sentimos, necesitamos tú permiso para acceder a las imagenes');
                }
            }
        })()
    }, [])
    return <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={async () => {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true
            })

            if (res.cancelled === false) {
                let localUri = res.uri;
                let filename = localUri.split('/').pop();
                // Infer the type of the image
                let match = /\.(\w+)$/.exec(filename);
                let type = match ? `image/${match[1]}` : `image`;
                onChange({ uri: localUri, name: filename, type })
            }
        }}>
            <Image source={value} style={{ width: 50, height: 50, margin: 5, borderRadius: 25, }}></Image>
        </TouchableOpacity>
    </View>
}