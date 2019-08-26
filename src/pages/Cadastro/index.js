import React, {useState} from 'react';
import {ToastAndroid} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import offFirst from '../../services/offfirst';

import {
  Container,
  SelectButton,
  SelectButtonText,
  Preview,
  Input,
  ShareButton,
  ShareButtonText,
} from './styles';

export default function Cadastro({navigation}) {
  const {produto = {}} = navigation.state.params;
  const [name, setName] = useState(produto.name || '');
  const [description, setDescription] = useState(produto.description || '');
  const [amount, setAmount] = useState(produto.amount || '');
  const [price, setPrice] = useState(produto.price || '');
  const [image, setImage] = useState(produto.image || null);

  function handleSelectimage() {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
      },
      upload => {
        if (upload.error) {
          console.log('Error');
        } else if (upload.didCancel) {
          console.log('Used canceled');
        } else {
          setImage(`data:image/jpeg;base64,${upload.data}`);
        }
      },
    );
  }

  async function handleSubmit() {
    if (!name || !description || !amount || !price || !image) {
      ToastAndroid.show(
        'Preencha todos os campos para salvar!',
        ToastAndroid.LONG,
      );
      return;
    }

    const result = await offFirst('produtos', 'add', {
      name,
      description,
      amount,
      price,
      image,
    });
    if (result) {
      setName('');
      setDescription('');
      setAmount('');
      setPrice('');
      setImage(null);
      navigation.state.params.refresh(result);
      navigation.goBack();
    } else {
      ToastAndroid.show('Um erro ocorreu ao tentar salvar!', ToastAndroid.LONG);
    }
  }

  return (
    <Container>
      <SelectButton onPress={handleSelectimage}>
        <SelectButtonText>Selecionar imagem</SelectButtonText>
      </SelectButton>

      {image && <Preview source={{uri: image}} />}

      <Input
        autoCorrect={false}
        placeholder="Nome"
        placeholderTextColor="#999"
        value={name}
        onChangeText={name => setName(name)}
      />

      <Input
        autoCorrect={false}
        placeholder="Descrição"
        placeholderTextColor="#999"
        value={description}
        onChangeText={description => setDescription(description)}
      />

      <Input
        keyboardType="numeric"
        placeholder="Quantidade"
        placeholderTextColor="#999"
        value={amount}
        onChangeText={amount => setAmount(amount)}
      />

      <Input
        keyboardType="numeric"
        placeholder="Preço"
        placeholderTextColor="#999"
        value={price}
        onChangeText={price => setPrice(price)}
      />

      <ShareButton onPress={handleSubmit}>
        <ShareButtonText>Compartilhar</ShareButtonText>
      </ShareButton>
    </Container>
  );
}
