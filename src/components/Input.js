import React from 'react';
import { StyleSheet, View, TextInput} from 'react-native';


export function Input({ placeholder, onPress, onChangeText, errors, ...rest }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.inputText} placeholder={placeholder}
        {...rest}
        onChangeText={onChangeText}
      />
     {errors && (
        errors
     )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '94%',
    height: 60,
    top: -50,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 12
  },
  inputText: {
    width: 300,
    height: 60,
    backgroundColor: '#F1F5F4',
    paddingLeft: 20,
    fontSize: 17,
    borderRadius: 10,
    padding: 4,
    borderWidth: 2,
    borderColor: '#5CC6BA',
  },

});