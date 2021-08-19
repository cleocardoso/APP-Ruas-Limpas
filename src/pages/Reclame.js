import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Keyboard, Image, View, Alert } from 'react-native';
import { Input } from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function Reclame() {

  const keyAsyncStorage = "@RuasLimpas:reclamacoes";


  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [observacao, setObservacao] = useState('');
  const [reclamacoes, setReclamacoes] = useState([]);

  async function clear() {
    await AsyncStorage.clear();
  }

  async function salvarReclamacao() {
    const data = {
      id: String(new Date().getTime()),
      rua: rua,
      bairro: bairro,
      observacao: observacao,

    }
    const vetData = [...reclamacoes, data]
    try {
      await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));
    } catch (error) {
      Alert.alert("Erro ao salvar Reclamação");
    }

    Keyboard.dismiss();
    setRua("");
    setBairro("");
    setObservacao("");
    loadData();   /*carega dados validos para tela */

    Alert.alert("Enviada com sucesso!");
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

      <View style={styles.input}>
        <Input placeholder="RUA" value={rua} onChangeText={(e) => setRua(e)} />
        <Input placeholder="BAIRRO" value={bairro} onChangeText={(e) => setBairro(e)} />
        <Input placeholder="COMENTE AQUI!" value={observacao} onChangeText={(e) => setObservacao(e)} />
      </View>
      <TouchableOpacity style={styles.btn} onPress={() => salvarReclamacao()}>
        <Text style={styles.btn_text}>Enviar</Text>
      </TouchableOpacity>
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
  input: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 29,
    justifyContent: 'center',
    alignItems: 'center',
    top: 100,
  },
  enviar: {
    height: 30,
    margin: 29,
    justifyContent: 'center',
    alignItems: 'center',
    top: 95,
    left: 10,

  },
  btn: {
    backgroundColor: '#5CC6BA',
    marginTop: 40,
    width: '80%',
    height: 56,
    left: 30,
    top: 90, /*  quando adicionar um input basta aumentar o top para o botao descer */
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn_text: {
    color: 'white',
    fontSize: 25,
  }
});
