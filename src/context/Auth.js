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
    const [isAdmin, setIsAdmin] = useState(false)
    const [categorias, setCategorias] = useState([])
    const [users, setUsers] = useState([])
    const [reclamacoes, setReclamacoes] = useState([])
    const [userLoading, setUserLoading] = useState(true);
    console.log("USER CONTEXT ", user)

    const userStorageKey = '@ifrndo:user';

    async function signIn(email, password, functionAction) {
        console.log('CONTEXT -> ', email, password)
        const resp = await api.post('/api/usuarios/login/', {
            email: email,
            senha: password
        })
        console.log(resp.status)
        if (resp.status === 200) {
            const userL = await resp.data
            setUser(userL)
            functionAction(userL)
            await AsyncStorage.setItem(userStorageKey, JSON.stringify(userL));
        }
    }

    useEffect(() => {
        //console.log("USER CONTEXT ", user)
    }, [user])

    //**Função para apagar usuário  */
    async function logout() {
        //setUser({});
        //await AsyncStorage.removeItem(userStorageKey);
    }

    function loadCategorias(){
        api.get('/api/categorias/')
        .then(resp => {
            const data = resp.data
            setCategorias(data)
        })
    }

    function loadUsers(){
        api.get('/api/usuarios/')
        .then(resp => {
            const data = resp.data
            setUsers(data)
        })
    }

    function loadReclamacoes(){
        api.get('/api/reclamacoes/')
        .then(resp => {
            const data = resp.data
            setReclamacoes(data)
        })
    }

    async function loadUserStorageDate(functionAction) {
       await AsyncStorage.getItem(userStorageKey)
       .then((resp)=>{
            let user = {}
            user = JSON.parse(resp)
            console.log(user)
            functionAction(user)
            setUser(user);
        })
        //logout()
        
    }

    useEffect(()=>{
        loadCategorias()
        loadUsers()
        loadReclamacoes()
    }, [])

    return (
        <AuthContext.Provider value={{ user, categorias, reclamacoes, users, signIn, logout, loadUserStorageDate, userLoading }}>
            {children}
        </AuthContext.Provider>

    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }