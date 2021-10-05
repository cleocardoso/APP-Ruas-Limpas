import React from 'react';
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
import 'moment/locale/pt-br';
import { useAuth } from '../context/Auth';

export default function InfoUser() {
  const {user} = useAuth()
  const data = moment().locale('pt-br').format('L');
  const hora = moment().locale('pt-br').format('H:mm');
  return (
    <View style={{top: 10}}>
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
              <Text>Olá usuario</Text>
            </Body>
          </Row>
        </Left>
        <Right style={{ top: 20 }}>
          <Body>
            <Text style={styles.text}>Ultimo acesso:</Text>
            <Text style={styles.text}>{data} ás {hora}min</Text>
          </Body>
        </Right>
      </Row>
      <Divider style={{ top: 8, marginBottom: 20 }} />
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 13.5,
  },
  textSecundary: {
    color: '#686867',
    textAlign: 'center',
    fontSize: 14,
  },
});

