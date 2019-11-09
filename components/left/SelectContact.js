import React, { useState, useEffect, useGlobal } from 'reactn';
import { Chat } from './Chat';
import { Users, CreateGroup, getChats } from '../server';
import { Contact } from './Contact';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    InputEventEvent,
    Button,
} from 'react-native';






export function SelectContacts(props) {
    const [users, setUsers] = useGlobal('users')
    const [selected, setSelected] = useState([])
    const [showContacts, setShowContacts] = useGlobal('showContacts')
    const [chatname, setChatname] = useState('')

    useEffect(() => {
        Users()
    }, [])

    useEffect(() => {
        console.log({ selected });

    }, [selected])

    const disabled = selected.length === 0 || (selected.length > 1 && chatname === '')

    return <View style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        border: '1px solid #E1E1E8 ',
    }}>

        {selected.length >= 2 && <InputEvent onChange={(e) => {
            setChatname(e.target.value)
        }} style={{
            padding: 5,
            height: 30,
            outline: 'none',
            margin: '20px 10px',
            border: 'none',
            borderBottom: '1px solid #815ae6',
            fontSize: '1rem'
        }} type="text" name="" id="" placeholder='Nombre del grupo' value={chatname} />}

        <TouchableOpacity disabled={disabled} onPress={() => {
            CreateGroup(chatname === '' ? users.find((user) => user.email === selected[0]).name : chatname, selected)
            setShowContacts(false)
        }} style={{
            padding: 4,
            backgroundColor: disabled ? 'gray' : '#815ae6',
            color: 'white',
            margin: '20px 20px'
        }}>
            <Text>Create group</Text>
        </TouchableOpacity>

        <View style={{
            height: '100%',
        }}>
            {users.map((user) => <Contact key={user.ID} onValueChange={(value) => {
                if (value) {
                    setSelected([
                        ...selected,
                        user.email
                    ])
                } else {
                    setSelected(selected.filter(email => email !== user.email))
                }
            }} value={selected.includes(user.email)} {...user} />)}
        </View>
    </View>
}