import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import ItemReclamacaoAdm from '../components/ItemReclamacaoAdm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/Auth';
import api from '../services/Api';

export function ListarReclameAdm() {
  const { user } = useAuth()
  const keyAsyncStorage = "@RuasLimpas:reclamacoesAdm";

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

  function onToggle(status, id){
      console.log(status, id)
      const data = {
        status_concluido: status
      }
      const params = new URLSearchParams();
      params.append('status_concluido', status);
      api.put(`/api/solicitacoes/atualizarSolicitacoes/?id=${id}`, params).then(()=>{
          console.log("DEU CERTO!")
      }).catch(()=>{
          console.log("DEU ERRO!")
      })
  }

  async function loadData() {
    console.log(user)
    api.get(`/api/solicitacoes/`).then(async (resp) => {
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


  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container} >

      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList data={reclamacoes}
          keyExtractor={item => item.reclamacoes.id * 100}
          renderItem={({ item, index }) => (
            <ItemReclamacaoAdm onToggle={(status) => onToggle(status, item.id)} rua={item.reclamacoes.rua} bairro={item.reclamacoes.bairro} categorias={item.reclamacoes.categorias} status={item.statusConcluido} data_reclamacao={item.reclamacoes.data_reclamacao} observacao={item.reclamacoes.descricao}  />
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
