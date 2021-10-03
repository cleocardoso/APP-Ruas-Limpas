import React from "react";
import { Icon, Left, ListItem, Right, Row } from "native-base";
import { StyleSheet, Text } from "react-native";
import Feather from 'react-native-vector-icons/FontAwesome'
import { Divider } from "react-native-paper";

export default function Card({item}) {
    return (
        <>
            <ListItem itemDivider>
                <Text style={styles.text}>Data: </Text><Text note>{item.data_reclamacao}</Text>
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
                <Right style={{right: 10}}>
                    <Icon onPress={() => alert("Ola")}>
                        <Feather color="#686867" size={28} name="info-circle"/>
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