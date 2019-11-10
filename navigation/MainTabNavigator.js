import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import InfoScreen from '../screens/InfoScreen';
import ChatNavigator from './ChatNavigator';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});


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
  ChatNavigator,
  InfoStack,
}, {
  tabBarOptions: {
    activeTintColor: Colors.prinColor
  }
});

tabNavigator.path = '';


export default tabNavigator;
