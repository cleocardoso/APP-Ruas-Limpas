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
import FormCategoria from './modals/categoria/FormCategoria';
import { useAuth } from '../context/Auth';

export default function TabsC({
  iconCategorias,
  categorias,
  iconUsuarios,
  iconReclamacoes,
  usuarios,
  reclamacoes,
}) {
  const [click, setClick] = useState(false)
  const {saveCategoria} = useAuth()

  return (
    <View style={{ top: 8, height: '85%' }}>
      <FormCategoria onPress={saveCategoria} onClose={() => setClick(false)} visible={click} />
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
            <AddButton onPress={() => setClick(true)}/>
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
