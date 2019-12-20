import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState, setGlobal, useGlobal } from 'reactn';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
import { BackdropProvider } from 'react-native-propel-kit';
import AppNavigator from './navigation/AppNavigator';

setGlobal({
  logged: false,
  users: [],
  showContacts: false,
  chats: [],
  activeChat: null,
  messages: [],
  showMenu: false,
  showGroups: true,
  showMessage: false,
  w: window.innerWidth,
  mode: 'pc',
  me: null,
  showSelectimg: false,
  notifications: {},
  text: '',
  emojiActive: false,
  fullname: '',
  mail: '',
  messages: [],
  password: '',
  img: null,
  loginerror: '',
  registererror: '',
  connected: false
})

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [connected] = useGlobal('connected')

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <BackdropProvider>
        <View style={{
          flex: 1,
          backgroundColor: '#fff',
          maxWidth: 1000,
        }}>
          {!connected && <Text style={{
            position: 'absolute',
            top: 40,
            width: '100%',
            textAlign: 'center',
            backgroundColor: 'yellow',
            elevation: 100,
            zIndex: 100,
            height: 50,
            textAlignVertical: 'center'
          }}>Connecting</Text>}
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </BackdropProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

