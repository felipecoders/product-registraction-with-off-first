import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Platform} from 'react-native';
import {StackActions, NavigationActions} from 'react-navigation';

import {Container, Input, Button, ButtonText, Logo} from './styles';

import logo from '../../assets/logo.jpg';

export default function SignIn({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@SignIn:user').then(user => {
      if (user) {
        console.log('aqui');
        goToMain();
      }
    });
  }, []);

  async function handleLogin() {
    await AsyncStorage.setItem('@SignIn:user', username);
    goToMain();
  }

  function goToMain() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Main'})],
    });
    navigation.dispatch(resetAction);
  }

  return (
    <Container behavior="padding" enabled={Platform.os === 'ios'}>
      <Logo source={logo} />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={e => setUsername(e)}
        placeholder="Username"
      />
      <Input
        secureTextEntry={true}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={e => setPassword(e)}
        placeholder="Senha"
      />
      <Button onPress={handleLogin}>
        <ButtonText>Login</ButtonText>
      </Button>
    </Container>
  );
}

SignIn.navigationOptions = () => ({
  header: null,
});
