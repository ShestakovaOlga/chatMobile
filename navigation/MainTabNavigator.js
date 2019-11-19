import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import InfoScreen from '../screens/InfoScreen';
import SettingsScreen from '../screens/SettingsScreen';
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


const AjustesStack = createStackNavigator(
  {
    Ajustes: SettingsScreen,
  },
  config
);

AjustesStack.navigationOptions = {
  tabBarLabel: 'Ajustes',
  tabBarIcon: ({ focused }) => (
    <AntDesign name="setting" size={26} color={focused ? Colors.prinColor : '#BDC3C7'} />
  ),
};

AjustesStack.path = '';



const tabNavigator = createBottomTabNavigator({
  GroupsStack,
  InfoStack,
  AjustesStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.prinColor
  }
});




export default tabNavigator;
