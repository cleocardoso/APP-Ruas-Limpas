import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Alert } from 'react-native';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { emailValidacao } from '../validacao/emailvalidacao';
import { senhaValidacao } from '../validacao/senhaValidacao';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../context/Auth';


export function Login({ navigation }) {
  const keyAsyncStorage = "@RuasLimpas:cadastrando";
  const keyAsyncStorageLogado = '@RuasLimpas:logado'
  const [email, setEmail] = useState({ value: '', error: '' });
  const [senha, setSenha] = useState({ value: '', error: '' });
  const { user, signIn, loadUserStorageDate } = useAuth()

  async function handleLogin() {
    const emailError = emailValidacao(email.value);
    const senhaError = senhaValidacao(senha.value);
    console.log(email, ' ', senha)
    try {
      if (emailError || senhaError) {
        setEmail({ ...email, error: emailError });
        setSenha({ ...senha, error: senhaError });
        return;
      }

      /*const users =
        (await JSON.parse(await AsyncStorage.getItem(keyAsyncStorage))) || [];
      console.log(users)
      if (users.length > 0) {
        const userAux = users.filter((u) => u.email === email.value && u.senha === senha.value)
        if (userAux.length > 0) {
          await AsyncStorage.setItem(keyAsyncStorageLogado, JSON.stringify(userAux[0]))
          navigation.navigate('Home', { user: userAux[0] })
        }

      }*/
      signIn(email.value, senha.value).then(() => {
        console.log(user)
        if (Object.keys(user).length > 0) {
          console.log('user ', user)
          navigation.navigate('Home', { user: user })
        }
      })

    } catch (e) {
      console.log(e)
      Alert.alert("Erro na autenticação!");
    }
  }

  useEffect(() => {
    loadUserStorageDate((user)=>{
      console.log('LOGIN ', user)
      if (Object.keys(user).length > 0) {
        navigation.navigate('Home', { user: user })
      }
    })
  }, [])

  return (
    <View style={GlobalStyles.screenContainer}>
      <Image style={styles.imagem} source={require('../imgs/R.png')} />

      <Input
        placeholder="E-mail"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Input
        placeholder="Senha"
        value={senha.value}
        onChangeText={text => setSenha({ value: text, error: '' })}
        error={!!senha.error}
        errorText={senha.error}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.text1}>Esqueceu Senha?</Text>
      </TouchableOpacity>

      <View style={styles.entrar}>
        <MainButton title="Entrar" onPress={handleLogin} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.text}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGoogleSocial} >
        <AntDesign name="google" size={20} color="#5CC6BA" />
        <Text style={styles.textButtonGoogle}>Login com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
  },
  imagem: {
    width: 250,
    height: 200,
    top: -20,
  },
  Text: {
    fontSize: 20,
    color: '#5CC6BA',
    fontWeight: 'bold',
    top: -40,
    left: -95,
  },

  button: {
    width: 150,
    height: 30,
    left: -15,
    borderRadius: 5,
    top: -40,
  },

  button2: {
    width: 160,
    height: 30,
    left: 80,
    top: 60,
    borderRadius: 5,
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5CC6BA',
    textAlign: 'center',
  },
  text1: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5CC6BA',
    textAlign: 'center',
    top: -95,
    left: -10,

  },
  entrar: {
    left: -5,
    top: 15,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
  buttonGoogleSocial: {
    marginTop: 50,
    width: '90%',
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    top: -80,
    left: -10

  },
  textButtonGoogle: {
    color: '#5CC6BA',
    fontSize: 18,
    left: -40,
    fontWeight: 'bold',
  }
});
