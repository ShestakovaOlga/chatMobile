import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import MainTabNavigator from './MainTabNavigator';
import MessageScreen from '../screens/MessageScreen';
import SelectContactScreen from '../screens/SelectContactScreen';
import MembersGroupInfo from '../screens/MembersGroupInfo';
import NameUserInfo from '../components/Ajustes/NameUserInfo';
import FormContact from '../components/FormContact';

const ChatStack = createStackNavigator({
  Chat: MessageScreen
})
const SelectContact = createStackNavigator({
  Contacts: SelectContactScreen
})
const MembersGroup = createStackNavigator({
  Members: MembersGroupInfo
})
const NameUserInfoStack = createStackNavigator({
  NameUserInfo: NameUserInfo
})

const FormContactStack = createStackNavigator({
  FormContact: FormContact
})
export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Login: LoginScreen,
    Signup: SignupScreen,
    Main: MainTabNavigator,
    Chat: ChatStack,
    Contacts: SelectContact,
    Members: MembersGroup,
    NameUserInfo: NameUserInfoStack,
    FormContact: FormContactStack,
  })
);
