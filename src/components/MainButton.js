import { Body, Item, Left, Right, Row } from 'native-base';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';



export function MainButton({user, title, onPress, visible}) {
  return (
    <Item style={{borderBottomWidth: 0, top: 10, width: '93%'}}>
      {/*<View>
        <Text >{user}</Text>
      </View>*/}
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={onPress}>
        <View style={[styles.row, styles.center]}>
          {visible &&(
            <ActivityIndicator style={{marginRight: 10}} color="white" />
          )}
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
    </Item>

  )
};
const styles = StyleSheet.create({

  button: {
    height: 50,
    borderRadius: 5,
    backgroundColor: '#2B887E',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  text: {
    fontSize: 18,
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