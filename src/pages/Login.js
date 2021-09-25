import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Alert } from 'react-native';
import { InputLogin } from '../components/InputLogin';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

      signIn(email.value, senha.value, (user) => {
        console.log(user)
        if (user != null) {
          if (Object.keys(user).length > 0) {
            console.log('user ', user)
            navigation.navigate('Home', { user: user })
          }
        }
      })

    } catch (e) {
      console.log(e)
      Alert.alert("Erro na autenticação!");
    }
  }

  useEffect(() => {
    loadUserStorageDate((user) => {
      console.log('LOGIN ', user)
      if (user != null) {
        if (Object.keys(user).length > 0) {
          navigation.navigate('Home', { user: user })
        }
      }
    })
  }, [])

  return (
    <View style={GlobalStyles.screenContainer}>
      <Image style={styles.imagem} source={require('../imgs/R.png')} />

      <InputLogin
        placeholder="E-mail"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <InputLogin
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
      <TouchableOpacity style={styles.buttonGoogleSocial} >
        <AntDesign name="google" size={20} color="#5CC6BA" />
        <Text style={styles.textButtonGoogle}>Login com Google</Text>
      </TouchableOpacity>
      <Text style={styles.text2}> Não tem uma conta? </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.text}>Registre-se</Text>
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
    fontSize: 19,
    fontWeight: 'bold',
    color: '#5CC6BA',
    textAlign: 'center',
    left:70,
    top:5
  },
  text1: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5CC6BA',
    textAlign: 'center',
    top: -95,
    left: -10,

  },
  text2: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#C0C0C0',
    textAlign: 'center',
    top: -10,
    left: -80,

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
