import React, { useGlobal } from 'reactn';
import { GetChats } from '../server';
import { Menu } from './Menu';
import { SelectContacts } from './SelectContacts';
import { ChatList } from './ChatList';
import {
    View,
} from 'react-native';

export function MainLeft() {
    const [showContacts] = useGlobal('showContacts')

    return <View style={{
        height: '100%',
        backgroundColor: 'white', //'#7662E1',
        flex: 1,
        border: '1px solid #E1E1E8 ',
    }}>
        <Menu />
        {showContacts ? <SelectContacts /> : <ChatList />}
    </View>
}