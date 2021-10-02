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

export default function InfoHistory(){
  return (
    <View style={{ paddingLeft: 2, paddingRight: 2 }}>
          <Row>
            <Left>
              <Body>
                <Text style={styles.textSecundary}>Registro de Usuarios </Text>
                <Text style={styles.textSecundary}>No ultimo mês: 20</Text>
              </Body>
            </Left>
            <Right>
              <Body>
                <Text style={styles.textSecundary}>
                  Registro de Reclamações
                </Text>
                <Text style={styles.textSecundary}>No Ultimo mês: 10</Text>
              </Body>
            </Right>
          </Row>
        </View>
  )
}

const styles = StyleSheet.create({
  textSecundary: {
    color: '#686867',
    textAlign: 'center',
    fontSize: 14,
  },
});