import React, { useState } from 'react';
import { StyleSheet, FlatList} from 'react-native';
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
  List,
  ListItem,
  Icon,
  Fab,
  Button
} from 'native-base';

export default function ListItens({ data, renderItem, empty}) {
  const [refreshing, setRefreshing] = useState(false)

  function onRefresh(){
    setRefreshing(true)
    setTimeout(() =>{
      setRefreshing(false)
    }, 5000)
  }

  return (
    <View>
      <FlatList refreshing={refreshing} onRefresh={onRefresh} ListEmptyComponent={empty} data={data} renderItem={(item) => renderItem(item)} />
    </View>
  );
}
