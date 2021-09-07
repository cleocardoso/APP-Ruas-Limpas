import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import ItemReclamacao from '../components/ItemReclamacao';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ListarReclame() {

  const keyAsyncStorage = "@RuasLimpas:reclamacoes";


  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [observacao, setObservacao] = useState('');
  const [image, setImage] = useState(null);
  const [reclamacoes, setReclamacoes] = useState([]);

async function setChecked(index){
    let item = reclamacoes[index];
    item = {
        ...item,
        checked: !item.checked
    } 
    reclamacoes[index] = item
    console.log('item', item)
    await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(reclamacoes));
    await loadData()
}


async function loadData() {
  try {
    const retorno = await AsyncStorage.getItem(keyAsyncStorage);
    const dadosReclamacoes = await JSON.parse(retorno)
    console.log('loadData -> ', dadosReclamacoes);
    setReclamacoes(dadosReclamacoes || []);
  } catch (error) {
    Alert.alert("Erro na leitura de dados!");
  }
}
useEffect(() => {
  loadData();
}, []);

return (
  <View style={styles.container} >
    <Image style={styles.imagem} source={require('../imgs/R.png')} />

    <View>
    <FlatList data={reclamacoes}
                        keyExtractor={item => item.id}
                        renderItem={({ item, index }) => (
                          <ItemReclamacao status={item.status} observacao={item.observacao}  />                           
                        )}
                    />
   
    </View>    
  </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: "#FFFF"
  },
  imagem: {
    width: 130,
    height: 100,
    top: 0,
    left: 120,
  },
   
});