import React from 'react';

import { View, Text, TouchableOpacity, StyleSheet, DOMException, Alert, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import 'moment/locale/pt-br';
import SwitchComponent from './Switch'; '../components/Switch'


export default function ItemReclamacaoAdm(props, onPress) {

  const date = moment(props.data_reclamacao).locale('pt-br').format('L');
 
  return (

    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={[styles.text1, styles.text]}> Data: {(date)}</Text>
            <Text style={styles.text1}> Rua: {props.rua}</Text>
            <Text style={styles.text1}> Bairro: {props.bairro}</Text>
          </View>
          <View style={styles.right}>
            <SwitchComponent onToggle={props.onToggle}/>
          </View>
          
        </View>
        {props.categorias.map(categoria =>
          <View key={categoria.id} style={styles.row}>
            <Text style={styles.text1}> Categoria: {categoria.nome}</Text>
          </View>
        )}
        
        <View style={styles.row}>
          <Text style={styles.text1}> Observação: {props.observacao}</Text>
        </View>
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