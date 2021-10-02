import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  Container,
  Content,
  Header,
  Row,
  Left,
  Right,
  Thumbnail,
  Body,
  Text,
  Card,
  View,
  Tab,
  Tabs,
  TabHeading,
} from 'native-base';
import moment from 'moment';
import { useAuth } from '../context/Auth'

export default function InfoUser() {
  const {user} = useAuth()
  return (
    <View style={{backgroundColor: '#2B887E'}}>
      <Row>
        <Left>
          <Row>
            <Thumbnail
              source={{
                uri:
                  'https://www.globaltec.com.br/wp-content/uploads/2021/01/laptop-user-1-1179329.png',
              }}
            />
            <Body>
              <Text style={{color:'#f5f5f5'}}>Olá Usuário</Text>
            </Body>
          </Row>
        </Left>
        <Right style={{ top: 20 }}>
          <Body>
            <Text style={styles.text}>Ultimo acesso:</Text>
            <Text style={styles.text}>{moment().locale('pt-br').format("L")} ás {moment().locale('pt-br').format("H:mm")}min </Text>
          </Body>
        </Right>
      </Row>
      <Divider style={{ top: 15, marginBottom: 20 ,backgroundColor:'#f5f5f5'}} />
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 13.5,
    color:'#f5f5f5'
  },
  textSecundary: {
    color: '#686867',
    textAlign: 'center',
    fontSize: 14,
  },
});

