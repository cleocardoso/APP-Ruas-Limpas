import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,Image, Alert, View, Keyboard, ScrollView } from 'react-native';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';
import api from '../services/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export function Cadastro({ navigation }) {
    const keyAsyncStorage = "@RuasLimpas:cadastrando";
    console.log("Registro Aqui...")
    const [cadastros, setCadastros] = useState([]);
    const [user, setUser] = useState('');
    const [sobreNome, setSobreNome] = useState('');
    const [cidade, setCidade] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [foto, setFoto] = useState('');


    async function clear() {
        await AsyncStorage.clear();
    }


   
    async function clear() {
        await AsyncStorage.clear();
    }


    async function salvarCadastro() {
        try {
            const req = {
                nome: user,
                sobreNome,
                cidade,
                email,
                senha,
                active: false
            }
            const vetData = [...cadastros, req]

            const headers = new Headers();
            headers.append("Content-Type", "application/json")
            headers.append("Accept", 'application/json')

            const api = await fetch('https://apiruaslimpas.herokuapp.com/api/usuarios/', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(req)
            })


            try {
                await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));
                navigation.navigate('Home');
            } catch (error) {
                Alert.alert("Erro ao salvar Cadastro");
            }

            Keyboard.dismiss();

            setUser("");
            setSobreNome("");
            setCidade("");
            setEmail("");
            setSenha("");
            loadData();
        } catch (error) {
            console.log(error)
        }


    }
    async function loadData() {
        try {
            const retorno = await AsyncStorage.getItem(keyAsyncStorage);
            const dadosCadastros = await JSON.parse(retorno)
            //console.log('loadData -> ', dadosCadastros);
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

        <View style={GlobalStyles.screenContainer2}>
             
            <ScrollView>
                <View style={styles.container}>
                
                    
                    <Input placeholder="Nome" value={user} onChangeText={(e) => setUser(e)} />
                    <Input placeholder="Sobrenome" value={sobreNome} onChangeText={(e) => setSobreNome(e)} />
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
    perfil: {
        fontSize: 15,
        color: '#5CC6BA',
        fontWeight: 'bold',
        top: -40,
        left:-10,

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