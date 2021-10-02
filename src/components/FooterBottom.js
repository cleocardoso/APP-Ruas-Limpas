import React from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  List
} from 'native-base';

export default function FooterBottom({ menus }) {
  return (
    <Footer style={{backgroundColor: '#2B887E'}}>
      <FooterTab>
        <List dataArray={menus} renderItem={(item) => item}/>
      </FooterTab>
    </Footer>
  );
}
