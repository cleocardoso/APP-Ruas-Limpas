import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Keyboard, Image, View, Alert } from 'react-native';
import { Input } from '../components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';

export function Reclame() {

  const keyAsyncStorage = "@RuasLimpas:reclamacoes";


  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [observacao, setObservacao] = useState('');
  const [image, setImage] = useState(null);
  const [reclamacoes, setReclamacoes] = useState([]);

  async function clear() {
    await AsyncStorage.clear();
  }

  /*  function handlePicker () {
    ImagePicker.showImagePicker({}, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImage({uri: response.uri});
        // here we can call a API to upload image on server
      }
    });
  };  */
    function imagePickerCallback(data) {
        console.log(data)
  }

  /* function imagePickerCallback(data) {
    if (data.didCancel){
      return;
  }

  if (data.error){
    return;
}

if (!data.uri){
  return;
  }

setImage(data);
 */

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
    <Image
      source={{
        uri: image
          ? image.uri
          : 'https://img2.gratispng.com/20180520/sqh/kisspng-computer-icons-symbol-photography-camera-5b01d7721532b4.0509521615268473460868.jpg'
      }}
      style={styles.camera}

    />
    <TouchableOpacity style={styles.btn_envio} onPress={() => launchImageLibrary({}, imagePickerCallback )}>
      <Text style={styles.text}>Carregar Imagem</Text>
    </TouchableOpacity>
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
    top: 81, /*  quando adicionar um input basta aumentar o top para o botao descer */
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },

  btn_text: {
    color: 'white',
    fontSize: 25,
  },
  camera: {
    marginTop: 15,
    width: '15%',
    height: 45,
    left: 34,
    top: 130, /*  quando adicionar um input basta aumentar o top para o botao descer */

  },
  btn_envio: {
    backgroundColor: '#A9A9A9',
    width: '60%',
    height: 56,
    left: 95,
    top: 80, /*  quando adicionar um input basta aumentar o top para o botao descer */
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',

  },
  text: {
    color: '#000',
    fontSize: 16,
    padding: 22,
    paddingTop: 14,
    paddingLeft: 30
  },
});
