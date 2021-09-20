import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';




export default function ItemReclamacao(props,onPress ) {
  console.log(props)
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
      <Text style={styles.text1}> Data:{props.data_reclamacao}</Text>
      <Text style={styles.text1}> Status:{}</Text>
      </View>
      <View style={styles.container2}>
      <Text style={styles.text1}> Categoria:{props.nome}</Text>
      <Text style={styles.text1}> Observação: {props.observacao}</Text>
      </View>
        
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={props.apagar}>
          <AntDesign name="delete" size={25} color={"#black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    width: '90%',
    height: '90%',
    left: 15,
    backgroundColor: '#DEE4E4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
  text1: {
    paddingLeft: 50,
    fontSize: 17,
    left: -50,
    top: -30

  },

  button: {
    padding: 15,
    left: -20,
    marginLeft: 10,
   
  },
  container2: {
    flexDirection: 'column',
    top:40,
    left:-195
  },
  container1: {
    flexDirection: 'row',
    top:-20,
    left:4
    
  },


})