import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, DOMException, Alert, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';



export default function ItemUsuario(props, onPress) {

 
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={styles.text1}> Nome: {props.nome}</Text>
            <Text style={styles.text1}> Sobrenome: {props.sobreNome} </Text>
          </View>
        </View>
        {props.categorias.map(categoria =>
          <View key={categoria.id} style={styles.row}>
            <Text style={styles.text1}> Cidade: {props.cidade}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    /*marginTop: 0,
    width: '90%',
    height: '25%',
    left: 15,
    backgroundColor: '#DEE4E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,*/
    width: '90%',
    height: 'auto',
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 6,
    borderWidth: 2,
    //borderColor: '#686767',
    marginBottom: 10,
    top: 8,
    left:20,
    borderColor: '#5CC6BA',
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  text1: {
    padding: 5,
    fontSize: 17,
  },
  text: {
    backgroundColor: '#ccc',
    width:320,
    left:-1,
    opacity: 0.9,
    borderRadius: 0.5,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    top:40
  },
  right: {
    right: 1
  },
  left: {
    left: 1,
    flex: 1,
    
  },


})