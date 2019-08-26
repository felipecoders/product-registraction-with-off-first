import React, {useState, useEffect} from 'react';
import {FlatList, Alert, ToastAndroid} from 'react-native';
import {Container, HeaderButton, HeaderButtonIcon} from './styles';
import offFirst from '../../services/offfirst';

import plus from '../../assets/plus.png';

import ProductCard from '../../components/ProductCard';

let refresh;

export default function Main({navigation}) {
  const [produtos, setProdutos] = useState([]);

  refresh = newProd => {
    setProdutos([newProd, ...produtos]);
    console.log(newProd);
  };

  useEffect(() => {
    async function get() {
      const result = await offFirst('produtos', 'select');
      setProdutos(result.reverse());
    }
    get();
  }, []);

  async function remove(id) {
    Alert.alert('Atenção', 'Você deseja realmente deletar este item?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await offFirst('produtos', 'remove', id);
            setProdutos(produtos.filter(prod => prod._id !== id));
            ToastAndroid.show('Item deletado com sucesso!', ToastAndroid.SHORT);
          } catch (e) {
            ToastAndroid.show(
              'Um erro ocorreu ao tentar deletar!',
              ToastAndroid.LONG,
            );
          }
        },
      },
    ]);
  }

  function edit(id) {
    const produto = produtos.find(prod => prod._id === id);
    navigation.navigate('Cadastro', {produto});
  }

  return (
    <Container>
      <FlatList
        data={produtos}
        keyExtractor={product => product._id.toString()}
        renderItem={({item}) => (
          <ProductCard
            data={item}
            onRemove={id => remove(id)}
            onEdit={id => edit(id)}
          />
        )}
      />
    </Container>
  );
}

Main.navigationOptions = ({navigation}) => ({
  headerRight: (
    <HeaderButton onPress={() => navigation.navigate('Cadastro', {refresh})}>
      <HeaderButtonIcon source={plus} />
    </HeaderButton>
  ),
});
