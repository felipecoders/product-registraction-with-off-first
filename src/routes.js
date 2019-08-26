import React from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';

import SignIn from './pages/SignIn';
import Main from './pages/Main';
import Cadastro from './pages/Cadastro';

const Routes = createAppContainer(
  createStackNavigator(
    {
      SignIn,
      Main,
      Cadastro,
    },
    {
      initialRouteName: 'Main',
      defaultNavigationOptions: {
        headerTintColor: '#000',
        headerTitle: 'Minha empresa',
        headerBackTitle: null,
      },
      mode: 'modal',
    },
  ),
);

export default Routes;
