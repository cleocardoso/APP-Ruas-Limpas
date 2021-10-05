import React, { useState } from 'react'
import styled from 'styled-components'
import LottieView from 'lottie-react-native'
import { InputText } from '../../Input'
import { View, Modal, StyleSheet, Dimensions, Alert } from 'react-native'
import { Footer, Container, Content, Body, Text, Form, Button, Row, Left, Right, Icon } from 'native-base'
import { MainButton } from '../../MainButton'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useAuth } from '../../../context/Auth'

export default function FormCategoria({ visible, onClose, onPress}) {
    const [value, setValue] = useState('')

    return (
        <Modal
            visible={visible} transparent>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Row>
                        <Left style={{left: 10}}>
                            <Text note>
                                Registro
                            </Text>
                        </Left>
                        <Right style={{ right: 10 }}>
                            <Icon onPress={onClose}>
                                <AntDesign name="closecircle" color={'#f51'} size={20} />
                            </Icon>
                        </Right>
                    </Row>
                    <InputText onChangeText={(value) => setValue(value)} styleContainer={{
                        marginTop: 10,
                        width: '80%',
                        height: 40,
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 10,
                    }} styleInput={{
                        marginTop: 10,
                        height: 40,
                        backgroundColor: '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        borderRadius: 10,
                    }} placeholder={"Teste"} />
                    <View style={styles.center}>
                        <MainButton title={"Salve"} onPress={() => onPress(value, (resp)=>{
                            onClose();
                            if (resp.status !== 500){
                                Alert("Salvo com Sucesso!")
                            } else {
                                Alert("Erro ao salvar. Tente novamente!")
                            }
                        })} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: '85%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: Dimensions.get('window').height / 3,
    },
    content: {
        width: '95%',
        flex: 1,
        borderWidth: 0.2,
        borderRadius: 3.4,
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
})