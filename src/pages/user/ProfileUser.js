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
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import 'moment/locale/pt-br';


export function ProfileUser({ navigation }) {
    const { user } = useAuth()
    const data = moment(user.user.last_login).locale('pt-br').format('L');
    const datac = moment(user.user.date_joined).locale('pt-br').format('L');
    return (
        <Container>
            <Content>
                <Card>
                    <CardItem>
                        <Row>
                            <Col>
                                <Text>
                                    Nome: {user.user.nome}
                                </Text>
                            </Col>
                            <Col>
                                <Text>
                                    Sobrenome: {user.user.sobreNome}
                                </Text>
                            </Col>
                        </Row>
                    </CardItem>
                    <CardItem>
                        <Row>
                            <Col>
                                <Text>
                                    Cidade: {user.user.cidade}
                                </Text>
                            </Col>
                            <Col>
                                <Text>
                                    Email: {user.user.email}
                                </Text>
                            </Col>
                        </Row>
                    </CardItem>
                    <CardItem>
                        <Row>
                            <Col>
                                <View style={{flexDirection: 'row'}}>
                                    <Text>
                                        Status 
                                    </Text>
                                    {user.user.is_active &&(
                                        <Text style={[styles.ativo, styles.containerText]}>Ativo</Text>
                                    )}
                                    {!user.user.is_active &&(
                                        <Text style={[styles.inativo, styles.containerText]}>Inativo</Text>
                                    )}
                                </View>
                            </Col>
                            <Col>
                                <Text>
                                    Criado em: {datac}
                                </Text>
                            </Col>
                        </Row>
                    </CardItem>
                    <CardItem>
                        <Row>
                            <Col>
                                <Text>
                                    Ultimo acesso: {data}
                                </Text>
                            </Col>
                        </Row>
                    </CardItem>
                </Card>
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    ativo: {
        backgroundColor: '#2B887E',
    },
    inativo: {
        backgroundColor: '#bb2124',
    },  
    containerText:{
        padding: 5,
        marginLeft: 5,
        textAlign: 'center',
        borderRadius: 5,
        color: '#f5f5f5',
    }
});