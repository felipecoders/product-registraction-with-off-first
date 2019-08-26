import AsyncStorage from '@react-native-community/async-storage';

/**
 *
 * @param {string} key chave dos dados | table
 * @param {"add" | "remove" | "update" | "select"} action ação a ser executada
 * @param {any} value
 */
export default async function OffFirst(key, action, value) {
  try {
    const saved = await AsyncStorage.getItem(key);
    let datas = JSON.parse(saved) || [];
    if (action === 'add') {
      value._id =
        datas.length === 0 ? 1 : Number(datas[datas.length - 1]._id) + 1;
      datas.push(value);
    } else if (action === 'remove') {
      datas = datas.filter(data => data._id !== value);
    } else if (action === 'update') {
      datas = datas.map(data => (data._id === value._id ? value : data));
    } else if (action === 'select') {
      return value ? datas.find(data => data._id === value) : datas;
    }
    console.log('before', datas);
    await AsyncStorage.setItem(key, JSON.stringify(datas));
    console.log('after', datas);
    return value;
  } catch (e) {
    console.error(e);
  }
}
