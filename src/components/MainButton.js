import { Body, Left, Right, Row } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';



export function MainButton({user, title, onPress, visible}) {
  return (

    <View >
      <View>
        <Text >{user}</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={onPress}>
        <View style={[styles.row, styles.center]}>
          {visible &&(
            <ActivityIndicator style={{marginRight: 10}} color="white" />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>

  )
};
const styles = StyleSheet.create({

  button: {
    width: 300,
    height: 60,
    top: -60,
    left: -6,
    borderRadius: 10,
    backgroundColor: '#5CC6BA',
    alignContent: 'center',

  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    color: '#FFFFFF'
  },

  row: {
    flexDirection: 'row'
  },

  center:{
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }

})