import React from 'react';
import {Button} from 'react-native';
import {Container} from './styles';

export default function Main({navigation}) {
  return (
    <Container>
      <Button
        title="Cadastro"
        onPress={() => navigation.navigate('Cadastro')}
      />
    </Container>
  );
}
