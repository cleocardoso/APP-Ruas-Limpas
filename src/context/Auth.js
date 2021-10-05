import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/Api'
const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    //const [isAdmin, setIsAdmin] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [users, setUsers] = useState([])
    const [totalMes, setTotalMes] = useState({})
    const [totalMesreclamacao, setTotalMesreclamacao] = useState({})
    const [reclamacoes, setReclamacoes] = useState([])
    const [minhaReclamacoes, setMinhaReclamacoes] = useState([])
    const [userLoading, setUserLoading] = useState(true);
    const [totalMesUser,setTotalMesreclamacaoUser] = useState({})
    //console.log("USER CONTEXT ", user)

    const userStorageKey = '@ifrndo:user';

    function saveCategoria(value, functionAction){
        const params = new URLSearchParams();
        params.append('nome', value);
        api.post('/api/categorias/', {
            nome: value
        })
        .then((resp)=>{
            console.log(resp)
            functionAction(resp) 
        })
        .catch((error) =>{
            console.log('ERROR ', error)
            functionAction({
                status: 500
            })
        })
    }

    function removeCategoria(value){
        api.delete(`/api/categorias/deletarCategoria/?id=${value}`)
        .then((resp)=>{
            Alert("Removida com sucesso")
        })
        .catch((error) =>{
            Alert("Erro ao remover")
        })
    }

    async function signIn(email, password, functionAction, functionError) {
        // console.log('CONTEXT -> ', email, password)
        api.post('/api/usuarios/login/', {
            email: email,
            senha: password
        })
            .then(async resp => {
                const userL = resp.data
                setUser(userL)
                if (userL?.is_admin) {
                    loadAdmin()
                }
                functionAction(userL)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userL));
            })
            .catch(error => {
                functionError(error)
            })
    }
    //**Função para apagar usuário  */
    async function logout() {
        setUser({});
        await AsyncStorage.removeItem(userStorageKey);
    }

    function loadCategorias() {
        api.get('/api/categorias/')
            .then(resp => {
                const data = resp.data
                setCategorias(data)
            })
    }

    function loadUsers() {
        api.get('/api/usuarios/')
            .then(resp => {
                const data = resp.data
                setUsers(data)
            })
    }

    function loadReclamacoes() {
        api.get('/api/reclamacoes/')
            .then(resp => {
                const data = resp.data
                setReclamacoes(data)
            })
    }
     //para mostrar minhas reclamacoes
     async function loadMinhaReclamacoes() {
        /*try {
          const retorno = await AsyncStorage.getItem(keyAsyncStorage);
          const dadosReclamacoes = await JSON.parse(retorno)
          console.log('loadData -> ', dadosReclamacoes);
          setReclamacoes(dadosReclamacoes || []);
        } catch (error) {
          Alert.alert("Erro na leitura de dados!");
        }*/
        console.log(user)
        api.get(`/api/solicitacoes/listaSolicitacoes/?id=${user.user.id}`).then(async (resp) => {
          //console.log("REC ", resp.data)
          const array = []
          for (let rec of resp.data){
            const {reclamacoes} = rec
            const categorias = []
            for (let c of reclamacoes.categorias){
                const resp = await api.get(`/api/categorias/${c}/`)
                if (resp.status === 200){
                  categorias.push(resp.data)
                }
            }
            rec.reclamacoes.categorias = categorias;
            array.push(rec)
          }
          setMinhaReclamacoes(array)
        }).catch((error) => {
          console.log('error ', error)
        })
      }

    //para mostrar o total de usuarios por mes
    function loadTotalMes() {
        api.get('/api/usuarios/total_por_mes/')
            .then(resp => {
                const data = resp.data
                setTotalMes(data)

            })

    }
    //para mostrar o total de reclamacoes por mes
    function loadTotalreclamacoes() {
        api.get('/api/reclamacoes/total_por_mes/')
            .then(resp => {
                const data = resp.data
                setTotalMesreclamacao(data)

            })

    }

    async function loadUserStorageDate(functionAction) {
        await AsyncStorage.getItem(userStorageKey)
            .then((resp) => {
                let user = {}
                user = JSON.parse(resp)
                // console.log(user)
                if (user?.is_admin) {
                    loadAdmin()
                }
                functionAction(user)
                setUser(user);
            })
        //logout()

    }

    function loadAdmin() {
        loadCategorias()
        loadUsers()
        loadReclamacoes()
        loadTotalMes()
        loadTotalreclamacoes()
        logout()
        loadUserStorageDate()
        loadMinhaReclamacoes()
        
    }

    return (
        <AuthContext.Provider value={{ user, totalMes,minhaReclamacoes, totalMesUser,totalMesreclamacao, categorias, reclamacoes, users, signIn, logout, loadTotalMes, loadMinhaReclamacoes,loadTotalreclamacoes, loadUserStorageDate, setUserLoading, userLoading, saveCategoria, removeCategoria}}>
            {children}
        </AuthContext.Provider>

    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }