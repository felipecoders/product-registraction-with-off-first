import React from 'react';

import {
  Container,
  Image,
  Content,
  InfoContent,
  ExtraContent,
  Name,
  Description,
  Footer,
  Amount,
  Price,
  Button,
  ButtonText,
} from './styles';

export default function ProductCard({data, onRemove, onEdit}) {
  const {name, description, image, amount, price, _id} = data;

  return (
    <Container>
      <Image source={{uri: image}} />
      <Content>
        <InfoContent>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </InfoContent>
        <ExtraContent>
          <Amount>Quantidade: {amount}</Amount>
          <Price>R$ {parseFloat(price).toFixed(2)}</Price>
        </ExtraContent>
      </Content>
      <Footer>
        <Button background="#C62828" onPress={() => onRemove(_id)}>
          <ButtonText>remove</ButtonText>
        </Button>
        <Button background="#1565C0" onPress={() => onEdit(_id)}>
          <ButtonText>edit</ButtonText>
        </Button>
      </Footer>
    </Container>
  );
}
