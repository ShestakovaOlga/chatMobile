import { setGlobal, getGlobal } from 'reactn'
import * as WebBrowser from 'expo-web-browser'
import { AsyncStorage, Clipboard, Alert } from 'react-native'


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

export function modifyUser(id, name, email, password, company, role) {
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
}

export function getMessages(chatID) {
    socket.send(JSON.stringify({
        command: 'messages',
        payload: {
            chatID: chatID
        }
    }))
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
export async function sendSignup(name, email, password, avatar) {
    socket.send(JSON.stringify({
        command: 'newuser',
        payload: {
            name: name,
            email: email,
            password: password,
            avatar
        }
    }));
}


export async function Logout() {  //cerrar la sesion
    await AsyncStorage.removeItem('token')
    setGlobal({ logged: false })
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

export async function avatar(avatar) { //mandar avatar
    socket.send(JSON.stringify({
        command: 'avatar',
        payload: {
            avatar
        }
    }));
}

const ws = 'ws://192.168.1.10:8081/ws'
//const ws = 'ws://c7252baf.ngrok.io/ws'
//const ws = 'wss://chat.galax.be/ws'


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
            setGlobal({
                logged: true
            })
            break;
        case 'messages':
            setGlobal({
                messages: msg.payload.messages
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
            const chat = g.chats.find(chat => chat.id === msg.payload.message.chatID)
            if (chat) {
                setGlobal(g => ({
                    messages: [
                        ...g.messages,
                        msg.payload.message
                    ]
                }))
            }
            setGlobal({
                chats: [...g.chats.filter(chat => chat.id !== msg.payload.message.chatID), chat],
                // notifications: {
                //     [chat.ID]: g.notifications[chat.ID] ? g.notifications[chat.ID] + 1 : 1
                // }
            })
            break;
    }
}

