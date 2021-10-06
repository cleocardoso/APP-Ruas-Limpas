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

export default function TabsUser({
  Reclame,
  minhaReclamacoes,
  iconReclame,
  iconReclamacoes,
  iconListReclamacoes,
  reclamacoes,
}) {
  return (
    <View style={{ top: 8, height: '85%' }}>
      <Tabs>
        <Tab
          tabStyle={{ backgroundColor: '#2B887E' }}
          activeTabStyle={{ backgroundColor: '#2B887E' }}
          heading={
            <TabHeading style={{ backgroundColor: '#2B887E' }}>
              <>
                {iconListReclamacoes}
                <Text style={styles.text}>Minhas Reclamações</Text>
              </>
            </TabHeading>
          }>
          {minhaReclamacoes}
        </Tab>
        <Tab
          tabStyle={{ backgroundColor: '#2B887E' }}
          activeTabStyle={{ backgroundColor: '#2B887E' }}

          heading={
            <TabHeading style={{ backgroundColor: '#2B887E' }}>
              <>
                {iconReclame}
                <Text style={styles.text}>Reclame</Text>
              </>
            </TabHeading>
          }>
          {Reclame}
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
