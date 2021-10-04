import { InputGroup, Item, Input, Body } from 'native-base';
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';


export function InputText({ placeholder, onPress, onChangeText, errors, ...rest }) {
  return (
    <>
      <Item rounded style={styles.container}>
        <Input style={styles.inputText} placeholder={placeholder}
          {...rest}
          onChangeText={onChangeText}
        />
      </Item>
      <View style={{flex: 1, left: 10}}>
        {errors && (
          errors
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '94%',
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  inputText: {
    width: 300,
    height: 60,
    //backgroundColor: '#F1F5F4',
    paddingLeft: 20,
    fontSize: 17,
    borderRadius: 10,
    padding: 4,
    borderWidth: 0.5,
    borderColor: '#2B887E',
  },

});