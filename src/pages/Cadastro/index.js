import React, {useState} from 'react';
import ImagePicker from 'react-native-image-picker';

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
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'heic' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          setImage(image);
          setPreview(preview);
        }
      },
    );
  }

  async function handleSubmit() {
    console.log('submitando');
  }

  return (
    <Container>
      <SelectButton onPress={handleSelectimage}>
        <SelectButtonText>Selecionar imagem</SelectButtonText>
      </SelectButton>

      {preview && <Preview source={preview} />}

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
        value={quantidade}
        onChangeText={quantidade => setQuantidade(quantidade)}
      />

      <Input
        keyboardType="numeric"
        placeholder="Preço"
        placeholderTextColor="#999"
        value={preco}
        onChangeText={preco => setPreco(preco)}
      />

      <ShareButton onPress={handleSubmit}>
        <ShareButtonText>Compartilhar</ShareButtonText>
      </ShareButton>
    </Container>
  );
}
