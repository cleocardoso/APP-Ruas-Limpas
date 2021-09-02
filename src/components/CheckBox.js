import React,{ useState }  from 'react';
import { Checkbox } from 'react-native-paper';


export default function CheckBox({isChecked, onPress}){ 
  
  return (
    <Checkbox
      color='#1DB863'
      status={isChecked ? 'checked' : 'unchecked'}
      onPress={onPress}
    />
  );
};