import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import InfoScreen from '../screens/InfoScreen';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import GroupsScreen from '../screens/GroupsScreen';

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

GroupsStack.navigationOptions = {
  tabBarLabel: 'Chats',
  tabBarIcon: ({ focused }) => (
    <Ionicons name="ios-chatbubbles" size={32} color={focused ? Colors.prinColor : '#BDC3C7'} />
  ),
};

GroupsStack.path = '';

const InfoStack = createStackNavigator(
  {
    Info: InfoScreen,
  },
  config
);

InfoStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <AntDesign name="infocirlceo" size={26} color={focused ? Colors.prinColor : '#BDC3C7'} />
  ),
};

InfoStack.path = '';



const tabNavigator = createBottomTabNavigator({
  GroupsStack,
  InfoStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.prinColor
  }
});

tabNavigator.path = '';


export default tabNavigator;
