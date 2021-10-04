import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import ItemReclamacao from '../../components/ItemReclamacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/Auth';
import api from '../../services/Api';

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
    api.get(`/api/solicitacoes/listaSolicitacoes/?id=${user.user.id}`).then(async (resp) => {
      //console.log("REC ", resp.data)
      const array = []
      for (let rec of resp.data){
        const {reclamacoes} = rec
        const categorias = []
        for (let c of reclamacoes.categorias){
            const resp = await api.get(`/api/categorias/${c}/`)
            if (resp.status === 200){
              categorias.push(resp.data)
            }
        }
        rec.reclamacoes.categorias = categorias;
        array.push(rec)
      }
      setReclamacoes(array)
    }).catch((error) => {
      console.log('error ', error)
    })
  }

  async function deletar(item) {
    console.log("delete", item)
    await api.delete(`/api/reclamacoes/deletarReclamacoes/?id=${item.reclamacoes.id}`)
    await loadData();
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container} >

      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList data={reclamacoes}
          keyExtractor={item => item.reclamacoes.id * 100}
          renderItem={({ item, index }) => (
            <ItemReclamacao categorias={item.reclamacoes.categorias} status={item.statusConcluido} data_reclamacao={item.reclamacoes.data_reclamacao} observacao={item.reclamacoes.descricao} apagar={() => deletar(item)} />
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

