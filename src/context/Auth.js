import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/Api'
const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const [isAdmin, setIsAdmin] = useState(false)
    const [userLoading, setUserLoading] = useState(true);

    const userStorageKey = '@ifrndo:user';

    async function signIn(email, password) {
        console.log('CONTEXT -> ', email, password)
        const resp = await api.post('/api/usuarios/login/', {
            email: email,
            senha: password
        })
        console.log(resp.status)
        if (resp.status === 200) {
            setUser(await resp.data)
            await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
        }
    }

    useEffect(() => {
        console.log("USER CONTEXT ", user)
    }, [user])

    //**Função para apagar usuário  */
    async function logout() {
        setUser({});
        await AsyncStorage.removeItem(userStorageKey);
    }

    function loadUserStorageDate(functionAction) {
        AsyncStorage.getItem(userStorageKey).then((resp)=>{
            functionAction(resp)
            setUser(resp);
        })
    }

    return (
        <AuthContext.Provider value={{ user, signIn, logout, loadUserStorageDate, userLoading }}>
            {children}
        </AuthContext.Provider>

    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }