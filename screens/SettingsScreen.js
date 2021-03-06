import React, { useState, useGlobal, useEffect } from 'reactn';
import {
    ScrollView,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEvent,
    Alert
} from 'react-native';
import Colors from '../constants/Colors';
import { Logout, getMe, modifyUser, getAvatar, removeProfile } from '../server';
import AvatarSelect from '../components/AvatarSelect'
import { TextInput } from 'react-native-gesture-handler';
import { MaterialIcons, AntDesign, Entypo, Ionicons, FontAwesome } from '@expo/vector-icons';




export default function SettingsScreen(props) {
    const [me] = useGlobal('me')
    const [img, setImg] = useGlobal('img')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [company, setCompany] = useState('')
    const [role, setRole] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [repeatpassword, setRepeatpassword] = useState('')
    const [showPasswordPart, setShowPasswordPart] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [logged] = useGlobal('logged')


    useEffect(() => {
        if (!logged) {
            props.navigation.navigate('Login')
        }
    }, [logged])


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

    const eyeStyle1 = {
        position: 'absolute',
        right: 11,
        height: 35,
        width: 30,
        padding: 2,
        alignItems: 'center',
        zIndex: 10,
    }
    const eyeStyle2 = {
        position: 'absolute',
        right: 11,
        height: 35,
        width: 30,
        padding: 2,
        alignItems: 'center',
        zIndex: 10,
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
            </>
            }

            <TouchableOpacity onPress={() => {
                setShowPasswordPart(!showPasswordPart)
            }}
                style={{
                    flexDirection: 'row',
                    marginTop: 15
                }}>
                <Text style={{ flexGrow: 1, marginLeft: 10, fontSize: 17, color: Colors.prinColor }}>Cambiar la contraseña</Text>
                {!showPasswordPart && <MaterialIcons name="keyboard-arrow-down" size={32} color={Colors.prinColor} />}
                {showPasswordPart && <MaterialIcons name="keyboard-arrow-up" size={32} color={Colors.prinColor} />}
            </TouchableOpacity>

            {showPasswordPart && <>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={eyeStyle1} onPress={() => {
                        setShowPassword(!showPassword)
                    }}>
                        {!showPassword ? <FontAwesome name="eye-slash" size={19} color={Colors.prinColor} /> :
                            <FontAwesome name="eye" size={19} color={Colors.prinColor} />}
                    </TouchableOpacity>

                    <TextInput
                        onChangeText={(value) => {
                            setPassword(value)
                        }}
                        style={{ ...inputStyle, width: '100%', marginBottom: 10 }}
                        placeholder='Contraseña antigua'
                        autoComplete='password'
                        value={password}
                        secureTextEntry={!showPassword}>
                    </TextInput>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={eyeStyle1} onPress={() => {
                        setShowPassword(!showPassword)
                    }}>
                        {!showPassword ? <FontAwesome name="eye-slash" size={19} color={Colors.prinColor} /> :
                            <FontAwesome name="eye" size={19} color={Colors.prinColor} />}
                    </TouchableOpacity>

                    <TextInput
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={{ ...inputStyle, width: '100%', marginBottom: 10 }}
                        value={password}
                        placeholder='Nueva contraseña'>
                    </TextInput>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={eyeStyle2} onPress={() => {
                        setShowPassword(!showPassword)
                    }}>
                        {!showPassword ? <FontAwesome name="eye-slash" size={19} color={Colors.prinColor} /> :
                            <FontAwesome name="eye" size={19} color={Colors.prinColor} />}
                    </TouchableOpacity>
                    <TextInput
                        onChangeText={setRepeatpassword}
                        secureTextEntry={!showPassword}
                        style={{ ...inputStyle, width: '100%' }}
                        value={repeatpassword}
                        placeholder='Repetir contraseña'>
                    </TextInput>
                </View>
                <TouchableOpacity onPress={() => {
                    if (repeatpassword === password) {
                        Alert.alert(
                            'Cambiar la contraseña',
                            '¿Estás seguro de querer cambiar la contraseña?',
                            [
                                {
                                    text: 'Cambiar', onPress: async () => {
                                        await modifyUser(
                                            getParam('password', ''),
                                        )
                                    }
                                },
                                {
                                    text: 'Me lo pensaré',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                            ],
                            { cancelable: false }
                        );
                    } else {
                        Alert.alert(
                            'Contraseña incorrecta',
                            'Las contraseñas no son iguales',
                            [
                                {
                                    text: 'Cerrar',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel',
                                },
                            ],
                            { cancelable: false }
                        );
                    }

                }} style={{
                    marginVertical: 20,
                    paddingVertical: 5,
                    marginHorizontal: 40,
                    borderWidth: 1,
                    borderColor: Colors.prinColor,
                    backgroundColor: Colors.prinColor,
                    borderRadius: 30,
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontWeight: 'bold',
                        marginRight: 5,
                        color: 'white'
                    }}>Guardar contraseña nueva </Text>
                </TouchableOpacity>
            </>}

            <TouchableOpacity style={{
                paddingHorizontal: 5,
                paddingVertical: 5,
                marginTop: 40,
                flexDirection: 'row',
                alignItems: 'center'
            }} onPress={async () => {
                Alert.alert(
                    'Eliminar tu cuenta',
                    '¿Estás seguro de querer eliminar tu cuenta? Esta acción es irreversible',
                    [
                        {
                            text: 'Eliminar', onPress: async () => {
                                await removeProfile()
                            }
                        },
                        {
                            text: 'Me lo pensaré',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                    ],
                    { cancelable: false }
                );

            }}>
                <AntDesign name="deleteuser" size={20} color={'red'} />
                <Text style={{ color: 'red', fontSize: 17, marginLeft: 15 }}>Eliminar la cuenta</Text>
            </TouchableOpacity>
            {/* {deleteError !== '' && <Text style={{ color: 'red', marginBottom: 10, fontSize: 17 }}>{deleteError}</Text>} */}

            <TouchableOpacity style={{
                paddingHorizontal: 5,
                paddingVertical: 20,
                marginTop: 10,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: Colors.prinColorLight,
            }} onPress={async () => {
                await Logout()
                props.navigation.navigate('Login')
            }}>
                <AntDesign name="closecircle" size={19} color={'red'} />
                <Text style={{ color: 'red', fontSize: 17, marginLeft: 15 }}>Cerrar la sesión</Text>
            </TouchableOpacity>
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