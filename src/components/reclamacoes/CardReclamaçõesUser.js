import React from "react";
import { Icon, Left, ListItem, Right, Row } from "native-base";
import { StyleSheet, Text } from "react-native";
import Feather from 'react-native-vector-icons/FontAwesome'
import { Divider } from "react-native-paper";
import moment from 'moment';
import 'moment/locale/pt-br';
import SwitchComponent from '../Switch';

export default function CardReclamacaoUser({ item, onPress }) {
    const date = moment(item.data_reclamacao).locale('pt-br').format('L');
    return (
        <>
            <ListItem itemDivider>
                <Text style={styles.text}>Data: </Text><Text note>{date}</Text>
            </ListItem>
            <Row>
                <Left>
                    <ListItem noBorder>
                        <Text style={styles.text}>Rua: </Text><Text note>{item.rua}</Text>
                    </ListItem>
                    <ListItem noBorder>
                        <Text style={styles.text}>Descrição: </Text><Text note>{item.descricao}</Text>
                    </ListItem>
                </Left>

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