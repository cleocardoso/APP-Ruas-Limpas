import React from "react";
import { Icon, Left, ListItem, Right, Row } from "native-base";
import { StyleSheet, Text } from "react-native";
import Feather from 'react-native-vector-icons/FontAwesome'
import { Divider } from "react-native-paper";
import moment from 'moment';
import 'moment/locale/pt-br';

import EvilIcons from 'react-native-vector-icons/EvilIcons'

export default function CardReclamacaoUser({ item, onPress }) {
    console.log(item)
    const date = moment(item.data_reclamacao).locale('pt-br').format('L');
    return (
        <>
            <ListItem itemDivider>
                <Text style={styles.text}>Data: </Text><Text note>{date}</Text>
            </ListItem>
            <Row>
                <Left>
                    <ListItem noBorder>
                        <Text style={styles.text}>Rua: </Text><Text note>{item?.reclamacoes?.rua}</Text>
                    </ListItem>
                    <ListItem noBorder>
                        <Text style={styles.text}>Descrição: </Text><Text note>{item?.reclamacoes?.descricao}</Text>
                    </ListItem>
                </Left>
                <Right>
                    <Icon onPress={onPress}>
                      <EvilIcons name="trash" color="#f51" size={28} />
                    </Icon>
                  </Right>
            </Row>
            <Divider />
        </>
    )
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold'
    }
})