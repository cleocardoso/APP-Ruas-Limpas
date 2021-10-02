import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import ItemReclamacao from '../components/ItemReclamacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/Auth';
import api from '../services/Api';
import ItemUsuario from '../components/ItemUsuarios';

export function ListarUsuarios() {
  const { user } = useAuth()
  const keyAsyncStorage = "@RuasLimpas:reclamacoes";

  console.log("ListarReclame...")
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [observacao, setObservacao] = useState('');
  const [image, setImage] = useState(null);
  const [reclamacoes, setReclamacoes] = useState([]);

  
  async function loadData() {
    
    console.log(user)
    api.get('https://apiruaslimpas.herokuapp.com/api/usuarios/').then(async (resp) => {
      //console.log("REC ", resp.data)
      const {reclamacoes} = rec
      
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
        <FlatList data={usuarios}
          keyExtractor={item => item.usuarios.id * 100}
          renderItem={({ item, index }) => (
            <ItemUsuario nome={item.usuarios.nome} sobreNome={item.usuarios.sobreNome}/>
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

