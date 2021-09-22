import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, Keyboard, Image, View, Alert, TextInput } from 'react-native';
import { Input } from '../components/Input';
import GlobalStyles from '../styles/GlobalStyles';
import { MainButton } from '../components/MainButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';
import { useFormik } from 'formik'
import * as yup from 'yup'
import {useAuth} from '../context/Auth'

export function Reclame() {

  const keyAsyncStorage = "@RuasLimpas:reclamacoes";
  //console.log("Reclame Aqui...")


  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [descricao, setDescricao] = useState('');
  const [count, setCount] = useState(0)
  const [image, setImage] = useState(null);
  const [categorias, setCategorias] = useState([])
  const [reclamacoes, setReclamacoes] = useState([]);
  const {user} = useAuth()

  const initialFormState = {
    rua: '',
    bairro: '',
    descricao: '',
    /* categorias: '', */

  }

  const userSchema = yup.object().shape({
    rua: yup.string().required('Informe nome da rua!'),
    bairro: yup.string().required('Informe nome do bairro!'),
    descricao: yup.string().required('Descrição Obrigatória!'),
    /*  categorias: yup.string().email().required('Informe uma categoria!'), */


  });

  const formik = useFormik({
    initialValues: initialFormState,
    validationSchema: userSchema,
    onSubmit: async (values) => {
      await salvarReclamacao(values.rua.trim(), values.bairro.trim(), values.descricao.trim())
    },
  })


  useEffect(() => {
    //loadData();
    ;
    loadCategorias().then(data => {
      setCategorias(data)
    })
  }, []);

  useEffect(() => {
    console.log("Categorias -> ", categorias)
  }, [categorias])

  async function clear() {
    await AsyncStorage.clear();
  }

  function imagePickerCallback(foto) {
    const { uri, type, fileName } = foto.assets[0];
    setImage({ uri, type, fileName })
  }



  async function salvarReclamacao(rua, bairro, descricao) {
    function getIDs() {
      const ids = []
      const array = categorias.filter((c) => c.checked)
      for (let c of array) {
        ids.push(c.id)
      }
      return ids;
    }
    const data = {
      //data_reclamacao,
      rua,
      bairro,
      descricao,
      imagem: null,
      usuario: user.user.id,
      categorias: getIDs(),

    }
    const vetData = [...reclamacoes, data]

    const headers = new Headers();
    headers.append("Content-Type", "application/json")
    headers.append("Accept", 'application/json')

    const api = await fetch('https://apiruaslimpas.herokuapp.com/api/reclamacoes/', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    })

    console.log("AQUI->> status ->", api.status, await api.json())

    try {
      await AsyncStorage.setItem(keyAsyncStorage, JSON.stringify(vetData));
    } catch (error) {
      Alert.alert("Erro ao salvar Reclamação");
    }
    Keyboard.dismiss();
    setRua("");
    setBairro("");
    setDescricao("");
    loadData();  /*carega dados validos para tela */
    console.log(data)
    console.log(reclamacoes)

    Alert.alert("Salvo com sucesso!");
  }

  async function loadData() {
    try {
      const retorno = await AsyncStorage.getItem(keyAsyncStorage);
      const dadosReclamacoes = await JSON.parse(retorno)
      console.log('loadData -> ', dadosReclamacoes);
      setReclamacoes(dadosReclamacoes || []);
    } catch (error) {
      Alert.alert("Erro na leitura de dados!");
    }
  }

  async function loadCategorias() {
    function isRepetion(array, categoria) {
      if (array.length === 0) {
        return false;
      }
      for (let c of array) {
        if (c.id === categoria.id) {
          return true;
        }
      }
      return false;
    }
    const novoCategorias = []
    const api = await fetch('https://apiruaslimpas.herokuapp.com/api/categorias/')
    if (api.status === 200) {
      const categoriasRes = await api.json()
      for (let categoria of categoriasRes) {
        const c = {
          ...categoria,
          checked: false
        }
        if (!isRepetion(novoCategorias, c)) {
          console.log("Categoria ", c)
          novoCategorias.push(c)
        }
      }
      console.log("Categorias ", novoCategorias)

    }
    return novoCategorias
  }

  function onCategorias(index) {
    const novoCategorias = set()
    const categoria = novoCategorias[index]
    //console.log("before ", categoria)
    categoria.checked = !categoria.checked
    // setCategorias(categorias)
    //console.log("alter ", categoria)
    novoCategorias.splice(index, 1, categoria)
    // setCategorias(() => novoCategorias)
    setCategorias(novoCategorias)
  }

  function set() {
    const newArray = new Array();
    for (let c of categorias) {
      newArray.push(c)
    }
    return newArray;
  }

  /*useEffect(()=>{ 
    console.log("Categorias ",categorias)
  }, [categorias])*/


  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Input placeholder="Rua" value={formik.values.rua} errors={
          formik.touched.rua && formik.errors.rua && (
            <Text style={styles.error}>{formik.errors.rua}</Text>
          )
        } onChangeText={formik.handleChange('rua')} />

        <Input placeholder="Bairro" value={formik.values.bairro} errors={
          formik.touched.bairro && formik.errors.bairro && (
            <Text style={styles.error}>{formik.errors.bairro}</Text>
          )
        } onChangeText={formik.handleChange('bairro')} />


        <View style={styles.categoria}>
          {categorias.map((categoria, index) =>
            <View key={categoria.id + Math.floor(100 + Math.random() * 100000)} style={{ margin: 5 }}>
              <View style={styles.contCheck}>
                <Checkbox
                  status={categoria.checked ? 'checked' : 'unchecked'}
                  onPress={() => onCategorias(index)}
                /><Text style={styles.texCategoria}>{categoria.nome}</Text>
              </View>
            </View>
          )}
        </View>

        <Input style={styles.descricao} placeholder="Descrição" value={formik.values.descricao} errors={
          formik.touched.descricao && formik.errors.descricao && (
            <Text style={styles.errordescricao}>{formik.errors.descricao}</Text>
          )
        } onChangeText={formik.handleChange('descricao')} />

      </View>

      <View style={styles.view_btn}>
        <MainButton title="Enviar" onPress={formik.handleSubmit} />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFF",

  },
  imagem: {
    width: 130,
    height: 100,
    top: 10,

  },
  textAreaContainer: {
    borderColor: '#5CC6BA',
    borderWidth: 2,
    top: -30,
    borderRadius: 12,
    left: -3

  },
  textArea: {
    height: 100,
    width: 296,
    fontSize: 17,
  },
  contCheck: {
    flexDirection: 'row',
    top: -50,
    alignItems: "baseline"
  },
  texCategoria: {
    top: -2,
  },
  error: {
    fontSize: 15,
    color: 'red',
    top: 36,
    height: -40,
    left: -296
  },
  errordescricao: {
    fontSize: 15,
    color: 'red',
    top: 56,
    height: -40,
    left: -296
  },
  view_btn: {
    left: 35,
    top: 375,

  },
  descricao: {
    width: 300,
    height: 80,
    backgroundColor: '#F1F5F4',
    paddingLeft: 20,
    fontSize: 17,
    borderRadius: 10,
    top: 10,
    padding: 4,
    borderWidth: 2,
    borderColor: '#5CC6BA',

  },

  input: {
    width: 300,
    height: 50,
    borderRadius: 5,
    margin: 29,
    justifyContent: 'center',
    alignItems: 'center',
    top: 200,

  },

  categoria: {
    top: 8,
    left: -50
  }

});