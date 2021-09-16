import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import ItemReclamacao from '../components/ItemReclamacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/Auth';
import api from '../services/Api';

export function ListarReclame() {
  const { user } = useAuth()
  const keyAsyncStorage = "@RuasLimpas:reclamacoes";

  console.log("ListarReclame...")
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [observacao, setObservacao] = useState('');
  const [image, setImage] = useState(null);
  const [reclamacoes, setReclamacoes] = useState([]);

  async function setChecked(index) {
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
    /*try {
      const retorno = await AsyncStorage.getItem(keyAsyncStorage);
      const dadosReclamacoes = await JSON.parse(retorno)
      console.log('loadData -> ', dadosReclamacoes);
      setReclamacoes(dadosReclamacoes || []);
    } catch (error) {
      Alert.alert("Erro na leitura de dados!");
    }*/
    console.log(user)
    api.get(`/api/reclamacoes/listaReclamacoes/?id=${1}`).then((resp) => {
      console.log("REC ", resp.data)
      setReclamacoes(resp.data)
    }).catch((error)=>{
      console.log('error ', error)
    })
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
            <ItemReclamacao status={item.status} observacao={item.descricao} />
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

