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
  View,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  ListItem,
  Button,
  CardItem,
  Col,
  Item,
  Card,
} from 'native-base';

import { useAuth } from '../../context/Auth'

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';

import InfoUser from '../../components/InfoUser';
import InfoHistoryUser from '../../components/InfoHistoryUser';
import TabsUser from '../../components/TabsUser';
import FooterBottom from '../../components/FooterBottom';
import ListItens from '../../components/List';
import ListReclamacoes from '../../components/reclamacoes/ListReclamacoes';
import ListReclamacoesUser from '../../components/reclamacoes/ListReclamacaoUser';

export function Home({ navigation }) {
  const { categorias, users, reclamacoes,minhaReclamacoes } = useAuth()

  

  return (

    <Container>
      <Content>
        <InfoUser />
        <InfoHistoryUser />
        <TabsUser
          reclamacoes={
            <ListReclamacoesUser data={reclamacoes} emptyMessage={"Sem Reclamaçoes"} />
          }
          Reclame={
            <ListReclamacoesUser data={minhaReclamacoes} emptyMessage={"Sem Reclamaçoes"}/>
          }
          iconReclamacoes={
            <Octicons name="megaphone" size={20} color='#f5f5f5' />
          }
          iconReclame={
            <AntDesign name="exclamationcircleo" size={20} color='#f5f5f5' />
          }
          iconListReclamacoes={
            <FontAwesome name="list" size={20} color='#f5f5f5' />
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