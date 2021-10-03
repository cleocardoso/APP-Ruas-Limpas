import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
  Fab,
  Button,
} from 'native-base';

import AddButton from './AddButton';

export default function TabsC({
  iconCategorias,
  categorias,
  iconUsuarios,
  iconReclamacoes,
  usuarios,
  reclamacoes,
}) {
  return (
    <View style={{ top: 8, height: '85%' }}>
      <Tabs>
        <Tab
          tabStyle={{ backgroundColor: '#2B887E'}}
          activeTabStyle={{ backgroundColor: '#2B887E' }}
          heading={
            <TabHeading style={{ backgroundColor: '#2B887E' }}>
              <>
                {iconCategorias}
                <Text style={styles.text}>Categorias</Text>
              </>
            </TabHeading>
          }>
          <View style={{height: Dimensions.get('window').height / 1.6}}>
            {categorias}
            <AddButton />
          </View>
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: '#2B887E' }}
          activeTabStyle={{ backgroundColor: '#2B887E' }}

          heading={
            <TabHeading style={{ backgroundColor: '#2B887E' }}>
              <>
                {iconUsuarios}
                <Text style={styles.text}>Usuarios</Text>
              </>
            </TabHeading>
          }>
          {usuarios}
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: '#2B887E' }}
          activeTabStyle={{ backgroundColor: '#2B887E' }}
          heading={
            <TabHeading style={{ backgroundColor: '#2B887E' }}>
              <>
                {iconReclamacoes}
                <Text style={styles.text}>Reclamações</Text>
              </>
            </TabHeading>
          }>
          {reclamacoes}
        </Tab>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#f5f5f5'
  }
})
