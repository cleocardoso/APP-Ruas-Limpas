import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, View, Alert } from 'react-native';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { emailValidacao } from '../validacao/emailvalidacao';
import { senhaValidacao } from '../validacao/senhaValidacao';

export function Login({ navigation }) {
  const keyAsyncStorage = '@RuasLimpas:cadastros';
  const keyAsyncStorageLogado = '@RuasLimpas:logado'
  const [email, setEmail] = useState({ value: '', error: '' });
  const [senha, setSenha] = useState({ value: '', error: '' });
  async function handleLogin() {
    const emailError = emailValidacao(email.value);
    const senhaError = senhaValidacao(senha.value);

    try {
      if (emailError || senhaError) {
        setEmail({ ...email, error: emailError });
        setSenha({ ...senha, error: senhaError });
        return;
      }

      const users =
        (await JSON.parse(await AsyncStorage.getItem(keyAsyncStorage))) || [];

      if (users.length > 0) {
        const userAux = users.filter((u) => u.email === email.value && u.senha === senha.value)
        if (userAux.length > 0) {
          await AsyncStorage.setItem(keyAsyncStorageLogado, JSON.stringify(userAux[0]))
          navigation.navigate('Home', { user: userAux[0] })
        }

      }
    } catch {
      Alert.alert("Erro na autenticação!");
    }
  }

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

      <MainButton title="Entrar" onPress={handleLogin} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.text}>Cadastre-se</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.text1}>Esqueci a Senha?</Text>
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
    left: -115,
    borderRadius: 5,
    top: -30,
  },

  button2: {
    width: 160,
    height: 30,
    left: 80,
    top: -60,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5CC6BA',
    textAlign: 'center',
  },
});
