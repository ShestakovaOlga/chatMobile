import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import GroupsScreen from '../screens/GroupsScreen';
import MessageScreen from '../screens/MessageScreen';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const GroupsStack = createStackNavigator(
  {
    Groups: GroupsScreen,
  },
  config
);


GroupsStack.path = '';

const ChatStack = createStackNavigator(
  {
    Chat: MessageScreen,
  },
  config
);


ChatStack.path = '';




const tabNavigator = createSwitchNavigator({
  GroupsStack,
  ChatStack
});

tabNavigator.path = '';

tabNavigator.navigationOptions = {
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-chatbubbles" size={32} color={focused ? Colors.prinColor : '#BDC3C7'} />
  ),
};

export default tabNavigator;
