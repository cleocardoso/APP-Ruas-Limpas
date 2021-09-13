import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, Alert, View, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';
import api from '../services/Api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useFormik } from 'formik'
import * as yup from 'yup'

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

    const initialFormState = {
        user: '',
        sobreNome: '',
        cidade: '',
        email: '',
        senha: ''
    }

    const userSchema = yup.object().shape({
        user: yup.string().required('Nome é obrigatório!'),
        sobreNome: yup.string().required('Sobrenome Obrigatório!'),
        cidade: yup.string().required('Cidade Obrigatório!'),
        email: yup.string().email().required('O e-mail é obrigatório!'),
        senha: yup.string().required('A senha é obrigatória!'),

    });

    const formik = useFormik({
        initialValues: initialFormState,
        validationSchema: userSchema,
        onSubmit: async (values) => {
            await salvarCadastro(values.user.trim(), values.sobreNome.trim(), values.cidade.trim(), values.email.trim(), values.senha.trim())
        },
    })

    async function clear() {
        await AsyncStorage.clear();
    }
    async function clear() {
        await AsyncStorage.clear();
    }
    async function salvarCadastro(user, sobreNome, cidade, email, senha) {
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
            console.log(req)

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
        < View style={GlobalStyles.screenContainer2} >

            <ScrollView>
                <View style={styles.container}>
                   
                        <Input placeholder="Nome" value={formik.values.user} errors={
                            formik.touched.user && formik.errors.user && (
                                <Text style={styles.error}>{formik.errors.user}</Text>
                            )

                        } onChangeText={formik.handleChange('user')} />

                        <Input placeholder="Sobrenome" value={formik.values.sobreNome} errors={
                            formik.touched.sobreNome && formik.errors.sobreNome && (
                                <Text style={styles.error}>{formik.errors.sobreNome}</Text>
                            )
                        } onChangeText={formik.handleChange('sobreNome')} />

                        <Input placeholder="Cidade" value={formik.values.cidade} errors={
                            formik.touched.cidade && formik.errors.cidade && (
                                <Text style={styles.error}>{formik.errors.cidade}</Text>
                            )
                        } onChangeText={formik.handleChange('cidade')} />

                        <Input placeholder="E-mail" value={formik.values.email} errors={
                            formik.touched.email && formik.errors.email && (
                                <Text style={styles.error}>{formik.errors.email}</Text>
                            )} onChangeText={formik.handleChange('email')} />

                        <Input placeholder="Senha" secureTextEntry={true} value={formik.values.senha} errors={
                            formik.touched.senha && formik.errors.senha && (
                                <Text style={styles.error}>{formik.errors.senha}</Text>
                            )} onChangeText={formik.handleChange('senha')} />
                    
                   
                </View>
                <View style={styles.view_btn}>
                <MainButton title="Salvar" onPress={formik.handleSubmit} />
            </View>
            </ScrollView>
           

        </View >

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
        left: -10,

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
    },
    error: {
        fontSize: 15,
        color: 'red',
        top: 36,
        height: -40,
        left: -296
    },

    view_btn: {
        left:12,
        top: 60,

    },
    



})