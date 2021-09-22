import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';




export default function ItemReclamacao(props, onPress) {
  console.log(props)
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={[styles.text1, styles.text]}> Data: {props.data_reclamacao}</Text>
          <Text style={styles.text1}> Status: true</Text>
        </View>
        <View style={styles.right}>
          <TouchableOpacity style={styles.button} onPress={props.apagar}>
            <AntDesign name="delete" size={25} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.text1}> Categoria: lixo</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text1}> Observação: {props.observacao}</Text>
      </View>
    </View>
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
    width: '100%',
    height: 'auto',
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 0.5,
    borderWidth: 0.1,
    borderColor: '#686767',
    marginBottom: 0.9
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
    opacity: 0.9,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  right: {
    right: 1
  },
  left: {
    left: 1,
    flex: 1
  },


})