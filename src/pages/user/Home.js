import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import GlobalStyles from '../../styles/GlobalStyles';
import { MainButton } from '../../components/MainButton';




export function Home({ navigation }) {

  async function Reclame() {
    navigation.navigate('Reclame')
  }

  async function ListarReclame() {
    navigation.navigate('ListarReclame')
  }
  return (

    <View style={GlobalStyles.screenContainer}>

      <Image style={styles.imagem} source={require('../../imgs/R.png')} />

      <TouchableOpacity style={styles.button} onPress={Reclame}>
        <Image style={styles.imagem2} source={require('../../imgs/reclame.png')} />
        <Text style={styles.btnStyle}>Reclame Aqui!</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button2} onPress={ListarReclame}>
        <Image style={styles.imagem3} source={require('../../imgs/list.png')} />
        <Text style={styles.buttonStyle}>Minhas Reclamações!</Text>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  imagem: {
    width: 130,
    height: 200,
    top: -90,
    left: 4,
  },  
  button: {
    width: 150,
    height: 100,
    top: -60,
    left: -80,
    borderRadius: 10,
    backgroundColor: '#5CC6BA',
    alignContent: 'center',
  },
  button2: {
    width: 150,
    height: 100,
    top: -160,
    left: 90,
    borderRadius: 10,
    backgroundColor: '#5CC6BA',
    alignContent: 'center',
  },
  imagem2:{
    width: 110,
    height: 100,
    top: -5,
    left: 10,
  },
  imagem3:{
    width: 60,
    height: 60,
    top: 5,
    left: 40,
  }, 
  buttonStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    top: 16,
    color: '#000',
    left: 8
  },
  btnStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    top: -23,
    color: '#000',
    left: 20
  },
  btn: {
    width: 300,
    top: -80,
    color: '#5CC6BA',

  }


})