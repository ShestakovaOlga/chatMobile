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
import { Logout, getMe, modifyUser, getAvatar } from '../server';
import AvatarSelect from '../components/AvatarSelect'
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons, AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import DateTimePicker from "react-native-modal-datetime-picker";

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
    const [showHours, setShowHours] = useState(false)
    const [date, setDate] = useState(null)
    const [showDatePicker, setShowDatePicker] = useState(false)

    useEffect(() => {
        getMe()
    }, [])
    useEffect(() => {
        if (me) {
            setName(me.name)
            setEmail(me.email)
            setCompany(me.company)
            setRole(me.role)
            setImg(getAvatar(me.id))
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
                role,
                img
            })
        }
    }, [name, password, email, company, role, img])

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
        flexDirection: 'row',
        alignItems: 'center'
    }
    const textLabelStyle = {
        paddingLeft: 5,
        color: Colors.prinColor,
        fontSize: 16,
    }
    return (
        <ScrollView style={{
            backgroundColor: 'white',
            height: '100%',
        }} >

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
            }}>
                <AvatarSelect allowed={me.id} value={img} onChange={setImg} />
                <TextInput onChangeText={setName} style={{
                    ...inputStyle,
                    flex: 1,
                    marginRight: 10,
                }} value={name}></TextInput>
            </View>
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


                <View style={labelStyle}>
                    <Entypo name="email" size={19} color={Colors.prinColor} />
                    <Text style={textLabelStyle} >Email</Text>
                </View>

                <TextInput onChangeText={setEmail} style={inputStyle} value={email}></TextInput>
                <Text style={{ marginLeft: 10, color: Colors.graylight, }}>Edita el email pulsándolo</Text>


                <View style={labelStyle}>
                    <Ionicons name="ios-people" size={27} color={Colors.companyIcon} />
                    <Text style={textLabelStyle}>Empresa</Text>
                </View>
                <TextInput onChangeText={setCompany} style={inputStyle} value={company}></TextInput>
                <Text style={{ marginLeft: 10, color: Colors.graylight, }}>Edita el nombre de la empresa pulsándolo</Text>


                <View style={labelStyle}>
                    <MaterialIcons name="person-pin" size={25} color={Colors.roleIcon} />
                    <Text style={textLabelStyle}>Puesto</Text>
                </View>
                <TextInput onChangeText={setRole} style={inputStyle} value={role}></TextInput>
                <Text style={{ marginLeft: 10, color: Colors.graylight, }}>Edita el nombre del puesto pulsándolo</Text>


                <View style={labelStyle}>
                    <Ionicons name="md-key" size={27} color={Colors.passwordIcon} style={{ marginLeft: 2 }} />
                    <Text style={textLabelStyle}>Contraseña</Text>
                </View>
                <TextInput onChangeText={setPassword} style={inputStyle} value={password} placeholder='Nueva contraseña'></TextInput>
                <TextInput onChangeText={setRepeatpassword} style={inputStyle} value={repeatpassword} placeholder='Repetir contraseña'></TextInput>
            </>}


            {/* <TouchableOpacity onPress={() => {
                setShowHours(!showHours)
            }}
                style={{
                    flexDirection: 'row',
                    marginTop: 15
                }}>
                <Text style={{ flexGrow: 1, marginLeft: 10, fontSize: 17, color: Colors.prinColor }}>Editar horario</Text>
                {!showHours && <MaterialIcons name="keyboard-arrow-down" size={32} color={Colors.prinColor} />}
                {showHours && <MaterialIcons name="keyboard-arrow-up" size={32} color={Colors.prinColor} />}
            </TouchableOpacity>

            {showHours && <>
                <TouchableOpacity onPress={() => {
                    setShowDatePicker(true)
                }}>
                    <Text>
                        La fecha de inicio
               </Text>
                </TouchableOpacity>

                <DateTimePicker
                    mode='date'
                    isVisible={showDatePicker}
                    onConfirm={(date) => {
                        setDate(date)
                        setShowDatePicker(false)
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                    locale="es_SP"
                /> */}

            {/* <TouchableOpacity onPress={() => {
                    setShowDatePicker(true)
                }}>
                    <Text>
                        La fecha de fin
                    </Text>
                </TouchableOpacity>

                <DateTimePicker
                    mode='date'
                    isVisible={showDatePicker}
                    onConfirm={(date) => {
                        setDate(date)
                        setShowDatePicker(false)
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                    locale="es_SP"
                /> */}

            {/* <TouchableOpacity onPress={() => {
                    setShowDatePicker(true)
                }}>
                    <Text>
                        Desde
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode='time'
                    isVisible={showDatePicker}
                    onConfirm={(date) => {
                        setDate(date)
                        setShowDatePicker(false)
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                    locale="es_SP"
                /> */}

            {/* <TouchableOpacity onPress={() => {
                    setShowDatePicker(true)
                }}>
                    <Text>
                        Hasta
                    </Text>
                </TouchableOpacity>
                <DateTimePicker
                    mode='time'
                    isVisible={showDatePicker}
                    onConfirm={(date) => {
                        setDate(date)
                        setShowDatePicker(false)
                    }}
                    onCancel={() => {
                        setShowDatePicker(false)
                    }}
                    locale="es_SP"
                />  </>} */}



            <TouchableOpacity onPress={() => {
                props.navigation.navigate('FormContact')
            }} style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 10,
                marginTop: 40,
                marginBottom: 20
            }}>
                <Text style={{ color: 'red', fontSize: 17 }}>Deja aquí tu comentario</Text>
            </TouchableOpacity>

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
                navigation.getParam('role', ''),
                navigation.getParam('img', ''),
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