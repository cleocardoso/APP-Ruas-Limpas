import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import Icon3 from 'react-native-vector-icons/AntDesign';

import CheckBox from '../components/CheckBox';


export default function ItemReclamacao(props) {
  console.log(props)
  return (
    <View style={props.checked ? styles.boxConcluida : styles.container} >
      <View style={styles.checkboxContainer}>
        <CheckBox onPress={props.onChecked} isChecked={props.checked}/>
      </View>
      <View>
        <Text style={props.checked ? styles.concluida : styles.text} 
         >{props.observacao}</Text>         
      </View>
     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    height: 65,
    top: 10,
    padding: 10,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#B6B4B4',
    margin: -1,
    flex: 1,
  },
  boxConcluida: {
    width: 360,
    height: 65,
    top: 10,
    padding: 10,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#D3D3D3',
    borderWidth: 1,
    borderColor: '#B6B4B4',
    margin: -1,
    flex: 1,
  },
  text: {
    fontSize: 18,
    color:'#808080',
    margin:-19,
    left:-150
   
  },
  IconStyle: {
    left: 10,
    fontSize: 30,
    color:'#808080',
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
    top:10,
    color:'#1DB863',
    
  },
  checkbox: {
    alignSelf: "center",
    color:'#1DB863',
    
  },
  concluida:{
    color:'#1DB863',
    fontSize: 19,
    fontWeight: 'bold',
}

})