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
  Icon,
  ListItem,
  Button,
} from 'native-base';

import { useAuth } from '../context/Auth'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import InfoUser from '../components/InfoUser';
import InfoHistory from '../components/InfoHistory';
import TabsC from '../components/TabsC';
import FooterBottom from '../components/FooterBottom';
import ListItens from '../components/List';

export function HomeAdmin({ navigation }) {
  const { categorias, users, reclamacoes} = useAuth()

  async function ListarUsuarios() {
    navigation.navigate('ListarUsuarios')
  }

  async function ListarReclameAdm() {
    navigation.navigate('ListarReclameAdm')
  }

  //const date = moment().locale('pt-br').format("L  H:mm ")

  return (

    <Container>
      <Content>
        <InfoUser />
        <InfoHistory />
        <TabsC
          reclamacoes={
            <ListItens
              renderItem={(item) =>
                <ListItem>
                  <Text note>{item}</Text>
                </ListItem>
              }
              data={reclamacoes}
              empty={<Card><Body><Text>Sem Reclamacoes</Text></Body></Card>}
            />
          }
          categorias={
            <ListItens
              empty={<Card><Body><Text>Sem categorias</Text></Body></Card>}
              data={categorias}
              renderItem={(item) =>
                <ListItem>
                  <Text note>{item.nome}</Text>
                </ListItem>
              }
            />
          }
          usuarios={
            <ListItens
              empty={<Card><Body><Text>Sem usuarios</Text></Body></Card>}
              data={users}
              renderItem={(item) =>
                <ListItem>
                  <Left>
                    <Thumbnail
                      style={{ width: 50, height: 50 }}
                      source={{
                        uri: item.foto
                          ? item.foto
                          : 'https://www.globaltec.com.br/wp-content/uploads/2021/01/laptop-user-1-1179329.png',
                      }}
                    />
                  </Left>
                  <Body>
                    <Text>{item.nome}</Text>
                    <Text note>
                      Sobre Nome: <Text note>{item.sobreNome}</Text>
                    </Text>
                    <Text note>
                      Cidade: <Text note>{item.cidade}</Text>
                    </Text>
                  </Body>
                </ListItem>

              }
            />
          }
          iconUsuarios={
            <FontAwesome name="users" size={28} color='#f5f5f5' />
          }
          iconCategorias={
            <FontAwesome name="list" size={28} color='#f5f5f5' />
          }
          iconReclamacoes={
            <FontAwesome name="list" size={28} color='#f5f5f5' />
          }
        />
      </Content>

    </Container>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: '#f5f5f5'
  },
});