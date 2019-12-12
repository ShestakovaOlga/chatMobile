import { setGlobal, getGlobal } from 'reactn'
import * as WebBrowser from 'expo-web-browser'
import { AsyncStorage, Clipboard, Alert } from 'react-native'
import { Notifications } from 'expo';
import * as ImageManipulator from 'expo-image-manipulator';


//mandar un mensaje nuevo
export function sendMessage(message, ID) {
    socket.send(JSON.stringify({
        command: 'newmessage',
        payload: {
            text: message,
            chatID: ID
        }
    }))
}

export function sendComment(message) {
    socket.send(JSON.stringify({
        command: 'comment',
        payload: {
            text: message,
        }
    }))
}

export function modifyUser(id, name, email, password, company, role, img) {
    socket.send(JSON.stringify({
        command: 'modifyuser',
        payload: {
            id,
            name,
            email,
            password,
            company,
            role,
        }
    }))
    if (img) {
        uploadAvatar(img)
    }
}

export function getMessages(chatID) {
    socket.send(JSON.stringify({
        command: 'messages',
        payload: {
            chatID: chatID
        }
    }))
}

export function pushToken(token) {
    socket.send(JSON.stringify({
        command: 'pushtoken',
        payload: {
            token
        }
    }))
}

export async function uploadAvatar(file) {
    const token = await AsyncStorage.getItem('token')
    const data = new FormData()
    data.append('file', file)
    data.append('token', token)

    fetch(url + '/avatar', {
        method: 'POST',
        body: data
    })
}

export async function uploadChatAvatar(file, chatId) {
    const token = await AsyncStorage.getItem('token')
    const data = new FormData()
    data.append('file', file)
    data.append('token', token)
    data.append('chatid', chatId)

    fetch(url + '/chatavatar', {
        method: 'POST',
        body: data
    })
}

export async function sendMessageFile(chatId, image, ext) {
    const token = await AsyncStorage.getItem('token')
    const data = new FormData()
    if (image) {
        const img = await ImageManipulator.manipulateAsync(image.uri, [], { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG })
        data.append('file', { uri: img.uri, name: image.filename, type: 'image/jpeg' })
        data.append('type', 'image')
    }
    // if (video) {
    //     data.append('file', video)
    //     data.append('type', 'video')
    // }
    data.append('ext', 'jpeg')
    data.append('token', token)
    data.append('chatid', chatId)

    fetch(url + '/sendmessagefile', {
        method: 'POST',
        body: data
    })
}

export function getAvatar(userId) {
    return { uri: `${url}/${userId}.png` }
}

export function getChatAvatar(chatId) {
    if (chatId) {
        return { uri: `${url}/chats/${chatId}.png` }
    }
    return { uri: `${url}/chats/chat.png` }
}

//sacar los contactos
export function Users() {
    socket.send(JSON.stringify({
        command: 'users'
    }));
}


//iniciar sesion
export async function login(email, password) {
    let ids = {}
    socket.send(JSON.stringify({
        command: 'login',
        payload: {
            email: email,
            password: password,
            pushToken: ids.userId
        }
    }));
}

//registrarse
export async function sendSignup(name, email, password) {
    socket.send(JSON.stringify({
        command: 'newuser',
        payload: {
            name: name,
            email: email,
            password: password,
        }
    }));
}


export async function Logout() {  //cerrar la sesion
    await AsyncStorage.removeItem('token')
    setGlobal({ logged: false })
    socket.close()
    socket = new WebSocket(ws)
    connect()
}

export async function removeProfile() {   //eliminar cuenta
    socket.send(JSON.stringify({
        command: 'removeProfile',
    }));
}

export async function CreateGroup(name, members) { //crear un grupo
    socket.send(JSON.stringify({
        command: 'newchat',
        payload: {
            name: name,
            members: members
        }
    }));
}

export async function getChats() {  //traerse los chats
    socket.send(JSON.stringify({
        command: 'chats',
    }));
}

export async function chatRead(ID) {
    socket.send(JSON.stringify({
        command: 'chatread',
        payload: {
            ID
        },
    }));
}

export async function getMe() {  //traer los datos del usuario
    socket.send(JSON.stringify({
        command: 'me',
    }));
}

export function getTime(date) {
    const today = new Date()
    const isThisMonth = today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth()
    if (isThisMonth && today.getDate() === date.getDate()) {
        return date.getHours() + ':' + date.getMinutes()
    }
    today.setDate(today.getDate() - 1)
    if (isThisMonth && today.getDate() === date.getDate()) {
        return 'Ayer ' + date.getHours() + ':' + date.getMinutes()
    }
    return date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
}

//const url = 'http://pc.galax.be:8081'
//const ws = 'ws://pc.galax.be:8081/ws'
const url = 'http://192.168.1.10:8081'
const ws = 'ws://192.168.1.10:8081/ws'


// Crea una nueva conexión.
let socket = new WebSocket(ws);
connect()

function connect() {
    socket.onclose = () => {
        setGlobal({
            connected: false,
        })
        socket = new WebSocket(ws)
        connect()
    }

    // Abre la conexión
    socket.addEventListener('open', async function (event) {
        setGlobal({
            connected: true,
        })
        socket.send(JSON.stringify({
            command: 'jwt',
            payload: {
                token: await AsyncStorage.getItem('token')
            }
        }));
    });

    // Escucha por mensajes
    socket.addEventListener('message', function (event) {
        try {
            gotServerMessage(JSON.parse(event.data))
        } catch (e) {
            console.log(event.data);
        }
    });
}



function gotServerMessage(msg) {    //servidor manda los mensajes
    switch (msg.command) {
        case 'jwt':
            AsyncStorage.setItem('token', msg.payload.token)
            setGlobal({
                logged: true
            })
            break;
        case 'users':
            setGlobal({
                users: msg.payload.users.map(m => ({
                    ...m,
                    _id: m.id
                }))
            })
            break;
        case 'open':
            if (msg.payload.chat) {
                setGlobal({
                    activeChat: msg.payload.chat
                })
            }
            break;
        case 'check':
            setTimeout(() => {
                setGlobal({
                    logged: true
                })
            }, 1000)

            break;
        case 'messages':
            setGlobal({
                messages: msg.payload.messages.map(m => {
                    if (m.image) {
                        m.image = url + m.image
                    }
                    if (m.video) {
                        m.video = url + m.video
                    }
                    return m
                })

            })
            break;
        case 'me':
            setGlobal({
                me: {
                    ...msg.payload.me,
                    _id: msg.payload.me.id
                }
            })
            break;
        case 'chats':
            setGlobal({
                chats: msg.payload.chats
            })
            break;
        case 'deleteok':
            setGlobal({
                logged: false
            })
            break;
        case 'logout':
            setGlobal({
                logged: false
            })
            break;
        case 'loginerror':
            setGlobal({
                loginerror: msg.payload.error
            })
            break;
        case 'registererror':
            setGlobal({
                registererror: msg.payload.error,
            })
            break;
        case 'chatexists':
            setGlobal({
                chatexists: msg.payload.error
            })
            break;
        case 'notifications':
            const n = msg.payload.notifications.filter(n => !n.read)
            setGlobal({
                notifications: n.length ? n.reduce((res, n) => {
                    res[n.chat] ? res[n.chat] += 1 : res[n.chat] = 1
                    return res
                }, {}) : []
            })
            break;
        case 'message':
            const g = getGlobal()
            const chat = g.chats.find(chat => chat.id === parseInt(msg.payload.message.chatID))
            console.warn('chat', msg.payload.message);
            if (msg.payload.message.image) {
                msg.payload.message.image = url + msg.payload.message.image
            }
            if (chat) {
                setGlobal(g => ({
                    messages: [
                        ...g.messages,
                        msg.payload.message
                    ]
                }))
            }
            if (g.activeChat !== chat.id) {
                Notifications.presentLocalNotificationAsync({
                    title: 'Nuevo mensaje de ' + msg.payload.message.user.name,
                    body: msg.payload.message.text,
                    data: {
                        chatId: chat.id
                    }
                })
                setGlobal({
                    notifications: {
                        ['chat' + chat.id]: g.notifications['chat' + chat.id] ? g.notifications['chat' + chat.id] + 1 : 1
                    }
                })
            }
            break;
    }
}

