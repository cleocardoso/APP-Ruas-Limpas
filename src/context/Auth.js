import React, {
    createContext,
    useContext,
    useState,
    useEffect
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/Api'
import AlertConfirm from '../components/modals/AlertConfirm';
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
    const [alertStatus, setAlertStatus] = useState({
        visible: false,
        error: false,
        success: false,
        warning: false,
        info: false,
        titleAlert: '',
        message: '',
        header: '',
        showButton: false,
        onConfirm: () =>{},
        onCancel: ()=>{},
    });
    const [totalMesUser, setTotalMesreclamacaoUser] = useState({})
    //console.log("USER CONTEXT ", user)

    const userStorageKey = '@ifrndo:user';

    function saveCategoria(value, functionAction) {
        const params = new URLSearchParams();
        params.append('nome', value);
        api.post('/api/categorias/', {
            nome: value
        })
            .then((resp) => {
                setAlertStatus({
                    visible: true,
                    success: true,
                    message: 'Categoria salva com Sucesso!'
                })
            })
            .catch((error) => {
                setAlertStatus({
                    visible: true,
                    error: true,
                    message: 'Não foi possível salvar!'
                })
            })
    }

    function removeCategoria(value, functionAction) {
        console.log(value)
        setAlertStatus({
            ...alertStatus,
            visible: true,
            titleAlert: "Aviso",
            warning: true,
            showButton: true,
            message: 'Deseja Remover a categoria?',
            onConfirm: () => {
                api.delete(`/api/categorias/deletarCategoria/?id=${value}`)
                    .then((resp) => {
                        setAlertStatus({
                            visible: true,
                            success: true,
                            message: 'Categoria removida com Sucesso!'
                        })
                    })
                    .catch((error) => {
                        setAlertStatus({
                            visible: true,
                            error: true,
                            message: 'Não foi possível remover!'
                        })
                    })
                const time = setTimeout(()=>{
                    setAlertStatus({
                        ...alertStatus,
                        visible: false,
                    })
                    clearTimeout(time)
                }, 3000)
            },
            onCancel: ()=>{
                setAlertStatus({
                    ...alertStatus,
                    visible: false,
                })
            }
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
                } else
                    loadUser(userL)
                functionAction(userL)
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userL));
            })
            .catch(error => {
                functionError(error)
            })
    }
    //**Função para apagar usuário  */
    function logout(functionAction) {
        const params = new URLSearchParams();
        params.append('id', user?.user?.id);
        api.post(`/api/usuarios/logout/`, params)
            .then(async (resp) => {
                setUser({});
                await AsyncStorage.removeItem(userStorageKey);
                functionAction(resp)
            })
            .catch(() => {
                functionAction({
                    status: 500
                })
            })

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
    function loadMinhaReclamacoes(user) {
        /*try {
          const retorno = await AsyncStorage.getItem(keyAsyncStorage);
          const dadosReclamacoes = await JSON.parse(retorno)
          console.log('loadData -> ', dadosReclamacoes);
          setReclamacoes(dadosReclamacoes || []);
        } catch (error) {
          Alert.alert("Erro na leitura de dados!");
        }*/
        console.log(user)
        if (user != null) {
            if (Object.keys(user).length > 0) {
                api.get(`/api/solicitacoes/listaSolicitacoes/?id=${user.user.id}`).then(async (resp) => {
                    //console.log("REC ", resp.data)
                    const array = []
                    for (let rec of resp.data) {
                        const { reclamacoes } = rec
                        const categorias = []
                        for (let c of reclamacoes.categorias) {
                            const resp = await api.get(`/api/categorias/${c}/`)
                            if (resp.status === 200) {
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

        }
    }

    //para mostrar o total de usuarios por mes
    function loadTotalMes() {
        api.get('/api/usuarios/total_por_mes/')
            .then(resp => {
                const data = resp.data
                setTotalMes(data)

            })

    }

    function deleteReclamacao(id) {
        setAlertStatus({
            ...alertStatus,
            visible: true,
            warning: true,
            showButton: true,
            message: 'Deseja Remover a reclamação?',
            onConfirm: () => {
                api.delete('/api/reclamacoes/deletarReclamacoes/?id=' + id + "&idUser=" + user?.user?.id)
                    .then(() => {
                        setAlertStatus({
                            visible: true,
                            success: true,
                            message: 'Reclamação removida com sucesso!'
                        })
                    })
                    .catch(() => {
                        setAlertStatus({
                            visible: true,
                            error: true,
                            message: 'Não foi possível remover!'
                        })
                    })

                    const time = setTimeout(()=>{
                        setAlertStatus({
                            ...alertStatus,
                            visible: false,
                        })
                        clearTimeout(time)
                    }, 3000)
            },
            onCancel: ()=>{
                setAlertStatus({
                    ...alertStatus,
                    visible: false,
                })
            }
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
                functionAction(user)
                setUser(user);
                if (user?.is_admin) {
                    loadAdmin()
                } else
                    loadUser(user)

            })
        //logout()

    }

    function loadUser(user) {
        loadMinhaReclamacoes(user)
        loadReclamacoes()
    }

    function loadAdmin() {
        loadCategorias()
        loadUsers()
        loadReclamacoes()
        loadTotalMes()
        loadTotalreclamacoes()
        //logout()
        //loadUserStorageDate()


    }

    return (
        <AuthContext.Provider value={{ user, totalMes, minhaReclamacoes, setAlertStatus, deleteReclamacao, alertStatus, totalMesUser, totalMesreclamacao, categorias, reclamacoes, users, signIn, logout, loadTotalMes, loadMinhaReclamacoes, loadTotalreclamacoes, loadUserStorageDate, setUserLoading, userLoading, saveCategoria, removeCategoria }}>
            <>
            <AlertConfirm error={alertStatus.error} success={alertStatus.success}
                warning={alertStatus.warning}
                info={alertStatus.info}
                header={alertStatus.header}
                message={alertStatus.message}
                onCancel={alertStatus.onCancel}
                onConfirm={alertStatus.onConfirm}
                visible={alertStatus.visible}
                showButton={alertStatus.showButton}
            />
            {children}
            </>
        </AuthContext.Provider>

    )
}

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth }