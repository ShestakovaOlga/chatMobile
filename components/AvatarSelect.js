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

export default function AvatarSelect({ onChange, value }) {
    useEffect(() => {
        (async () => {
            if (Constants.platform.ios) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })()
    }, [])
    return <View>
        <Image source={{ uri: value }} style={{ width: 50, height: 50 }}></Image>
        <TouchableOpacity onPress={async () => {
            const res = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
            })
            if (res.cancelled === false) {
                onChange('data:image/jpeg;base64,' + res.base64)
            }
        }}>
            <Text>Avatar</Text>
        </TouchableOpacity>
    </View>
}