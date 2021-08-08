import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, Keyboard, ScrollView } from 'react-native';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';

import AsyncStorage from '@react-native-async-storage/async-storage';


export function Cadastro({ navigation }) {
    const keyAsyncStorage = "@RuasLimpas:cadastros";

    const [cadastros, setCadastros] = useState([]);
    const [user, setUser] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [cidade, setCidade] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


    async function clear() {
        await AsyncStorage.clear();
    }

    async function salvarCadastro() {
        const data = {
            id: String(new Date().getTime()),
            name: user,
            sobrenome: sobrenome,
            cidade: cidade,
            email: email,
            senha: senha,

        }
        const vetData = [...cadastros, data]

        try {
            await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));
            navigation.navigate('Home');
        } catch (error) {
            Alert.alert("Erro ao salvar Cadastro");
        }

        Keyboard.dismiss();

        setUser("");
        setSobrenome("");
        setCidade("");
        setEmail("");
        setSenha("");
        loadData();

    }
    async function loadData() {
        try {
            const retorno = await AsyncStorage.getItem(keyAsyncStorage);
            const dadosCadastros = await JSON.parse(retorno)
            console.log('loadData -> ', dadosCadastros);
            setCadastros(dadosCadastros || []);
        } catch (error) {
            Alert.alert("Erro na leitura  dos contatos");
        }
    }

    useEffect(() => {
        //clear()/
        loadData();
    }, []);


    return (
    
        <View style={GlobalStyles.screenContainer}>
            {/*<Text style={styles.TextTitle}>Cadastro</Text>*/}
            <ScrollView>
                <View style={styles.container}>
                    <Input placeholder="Nome" value={user} onChangeText={(e) => setUser(e)} />
                    <Input placeholder="Sobrenome" value={sobrenome} onChangeText={(e) => setSobrenome(e)} />
                    <Input placeholder="Cidade" value={cidade} onChangeText={(e) => setCidade(e)} />
                    <Input placeholder="E-mail" value={email} onChangeText={(e) => setEmail(e)} />
                    <Input placeholder="Senha" secureTextEntry={true} value={senha} onChangeText={(e) => setSenha(e)} />


                    <MainButton title="Salvar" onPress={salvarCadastro} />

                </View>
            </ScrollView>

        </View>

    );
}

const styles = StyleSheet.create({
    ContainerCad: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'

    },
    title: {
        fontSize: 30,
    },
    imagem: {
        width: 200,
        height: 200,
        top: -60

    },
    Text: {
        fontSize: 20,
        color: '#5CC6BA',
        fontWeight: 'bold',
        top: -40,
        left: -95,

    },
    TextTitle: {
        fontSize: 25,
        color: '#5CC6BA',
        fontWeight: 'bold',
        bottom: 20,
        textAlign: 'center'
    },
    container: {
        top: 50,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})