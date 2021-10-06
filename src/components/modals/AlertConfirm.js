import React from 'react';
import LottieView from "lottie-react-native";
import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import { Body, Button, Content, Icon, Left, Right, Row, Text } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function AlertConfirm({ visible, error, warning, success, info, onConfirm, showButton, onCancel, titleAlert, message, header }) {

    return (
        <Modal transparent={true} visible={visible} onRequestClose={() => { }}>
            <Content style={{
                width: 300, height: 200, justifyItems: 'center', alignSelf: 'center',
                top: Dimensions.get('window').height / 3
            }}>
                <View style={{ backgroundColor: '#fff', borderRadius: 5, borderColor: '#686767', borderWidth: 0.1 }}>
                    <Body>
                        {error && (
                            <LottieView style={{ height: 80 }} source={require('../../assets/lotties/error.json')} autoPlay loop />
                        )}
                        {warning && (
                            <LottieView style={{ height: 80 }} source={require('../../assets/lotties/question.json')} autoPlay loop />
                        )}
                        {success && (
                            <LottieView style={{ height: 80 }} source={require('../../assets/lotties/success.json')} autoPlay loop />
                        )}
                        {info && (
                            <LottieView style={{ height: 80 }} source={require('../../assets/lotties/info.json')} autoPlay loop />
                        )}
                        <View style={{ marginTop: 30 }} />
                        <View style={{ textAlign: 'justify', padding: 5 }}>
                            <Text style={styles.header}>
                                {header !== undefined ? header : 'aviso!'}
                            </Text>
                            <Text
                                style={styles.titleAlert}
                            >
                                {titleAlert}
                            </Text>
                            <Text
                                style={styles.message}
                            >
                                {message}
                            </Text>
                        </View>
                    </Body>
                    {showButton && (
                        <Row>
                            <Left>
                                <Button onPress={onCancel} style={{ backgroundColor: '#ff5555', padding: 5, marginHorizontal: 5 }}>
                                    <Left>
                                        <Icon />
                                    </Left>
                                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                                        cancele
                                    </Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button onPress={onConfirm} style={{ backgroundColor: '#63bdb5', padding: 5, marginHorizontal: 5 }}>
                                    <Left>
                                        <Icon />
                                    </Left>
                                    <Text style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
                                        confirme
                                    </Text>
                                </Button>
                            </Right>
                        </Row>

                    )}
                    <View style={{ marginTop: 30 }} />
                </View>
            </Content>
        </Modal>
    );
}

const styles = StyleSheet.create({
    message: {
        textAlign: 'center',
        color: '#686767',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    titleAlert: {
        textAlign: 'justify',
        color: '#686767',
        fontSize: 14,
        textTransform: 'uppercase',
    },
    header: {
        color: '#686767',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }

})