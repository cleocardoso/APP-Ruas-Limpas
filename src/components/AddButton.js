import React, {useState, Fragment} from 'react';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Fab,
  Icon,
  View
} from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';

export default function AddButton({ menus, onPress }) {
   const [active, setAtive] = useState(false)
  return (
      <Fragment>
        <Fab
          active={active}
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: '#2B887E' }}
          position="bottomRight"
          onPress={() => setAtive(!active)}>
          <Ionicons onPress={onPress} name='add' size={30} />
        </Fab>
      </Fragment>
  );
}
