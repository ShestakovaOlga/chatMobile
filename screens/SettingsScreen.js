import React, { useState, useGlobal, useEffect } from 'reactn';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent
} from 'react-native';
import Colors from '../constants/Colors';
import { Logout, getMe, modifyUser } from '../server';
import AvatarSelect from '../components/AvatarSelect'
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

export default function SettingsScreen(props) {
    const [me] = useGlobal('me')
    const [img, setImg] = useGlobal('img')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [repeatpassword, setRepeatpassword] = useState('')
    const [showEdit, setShowEdit] = useState(false)

    useEffect(() => {
        getMe()
    }, [])
    useEffect(() => {
        if (me) {
            setName(me.name)
            setEmail(me.email)
            setCompany(me.company)
            setRole(me.role)
        }
    }, [me])

    useEffect(() => {
        if (me) {
            props.navigation.setParams({
                id: me.id,
                name,
                email,
                password,
                company,
                role
            })
        }
    }, [name, password, email, company, role])

    if (!me) {
        return <View style={{
            backgroundColor: 'white',
            marginVertical: 5,
            marginTop: 25,
            padding: 4,
            height: 65,
        }}>
            <TouchableOpacity onPress={async () => {
                await Logout()
                props.navigation.navigate('Login')
            }}>
                <Text style={{ color: 'red', fontSize: 17 }}>Cerrar la sesión</Text>
            </TouchableOpacity>
        </View>
    }
    const inputStyle = {
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginHorizontal: 10,
    }
    const labelStyle = {
        marginLeft: 20,
        marginTop: 30,
        fontSize: 15,
        color: Colors.prinColor
    }
    return (
        <ScrollView style={{
            backgroundColor: 'white',
            height: '100%',
        }} >

            <TouchableOpacity style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                {/* <TouchableOpacity onPress={() => {
                    <AvatarSelect value={img} onChange={setImg} />
                }}>
                </TouchableOpacity> */}
                <Image style={{
                    width: 60,
                    height: 60,
                    marginHorizontal: 5,
                    borderRadius: 30,
                }} source={{ uri: me.avatar }} />
                <TextInput onChangeText={setName} style={{
                    ...inputStyle,
                    flex: 1,
                    marginRight: 10,
                }} value={name}></TextInput>
            </TouchableOpacity>
            <Text style={{ color: Colors.graylight, marginLeft: 10 }}>Edita el nombre pulsándolo</Text>

            <TouchableOpacity onPress={() => {
                setShowEdit(!showEdit)
            }}
                style={{
                    flexDirection: 'row',
                    marginTop: 15
                }}>
                <Text style={{ flexGrow: 1, marginLeft: 10, fontSize: 17, color: Colors.prinColor }}>Editar perfil</Text>
                {!showEdit && <MaterialIcons name="keyboard-arrow-down" size={32} color={Colors.prinColor} />}
                {showEdit && <MaterialIcons name="keyboard-arrow-up" size={32} color={Colors.prinColor} />}
            </TouchableOpacity>

            {showEdit && <>
                <Text style={labelStyle}>Email</Text>
                <TextInput onChangeText={setEmail} style={inputStyle} value={email}></TextInput>
                <Text style={{ marginLeft: 10, color: Colors.graylight, }}>Edita el email pulsándolo</Text>


                <Text style={labelStyle}>Empresa</Text>
                <TextInput onChangeText={setCompany} style={inputStyle} value={company}></TextInput>
                <Text style={{ marginLeft: 10, color: Colors.graylight, }}>Edita el nombre de la empresa pulsándolo</Text>

                <Text style={labelStyle}>Puesto</Text>
                <TextInput onChangeText={setRole} style={inputStyle} value={role}></TextInput>
                <Text style={{ marginLeft: 10, color: Colors.graylight, }}>Edita el nombre del puesto pulsándolo</Text>

                <Text style={labelStyle}>Contraseña</Text>
                <TextInput onChangeText={setPassword} style={inputStyle} value={password} placeholder='Nueva contraseña'></TextInput>
                <TextInput onChangeText={setRepeatpassword} style={inputStyle} value={repeatpassword} placeholder='Repetir contraseña'></TextInput>
            </>}



            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity style={{
                    paddingHorizontal: 15,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 10,
                    marginTop: 40,
                    marginBottom: 20
                }} onPress={async () => {
                    await Logout()
                    props.navigation.navigate('Login')
                }}>
                    <Text style={{ color: 'red', fontSize: 17 }}>Cerrar la sesión</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}


SettingsScreen.navigationOptions = ({ navigation }) => ({
    headerRight: (
        <TouchableOpacity onPress={() => {
            modifyUser(
                navigation.getParam('id', ''),
                navigation.getParam('name', ''),
                navigation.getParam('email', ''),
                navigation.getParam('password', ''),
                navigation.getParam('company', ''),
                navigation.getParam('role', '')
            )
            navigation.navigate('Info')
        }} style={{
            marginRight: 10
        }}>
            <Text style={{
                fontWeight: 'bold',
                marginRight: 5,
                color: Colors.prinColor
            }}>Guardar</Text>
        </TouchableOpacity>
    ),
    title: 'Ajustes',
});