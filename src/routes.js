import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';
import { Reclame } from './pages/Reclame';
import { ListarReclame } from './pages/ListarReclame';

const Stack = createStackNavigator();

export function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Cadastro' component={Cadastro} options={{
                 title: 'Cadastre-se', headerTitleStyle: {

                    fontSize: 25,
                    color: '#5CC6BA',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    left:-90
                },
            }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Reclame' component={Reclame} options={{
                title: 'Reclamação', headerTitleStyle: {
                    color: '#5CC6BA',
                    fontSize: 25,
                    left:-80,
                    fontWeight: 'bold',
                    textAlign: 'center'

                },
            }}
            />

            <Stack.Screen name='ListarReclame' component={ListarReclame} options={{                         
                title: 'Minhas Reclamações',  headerTitleStyle: {                  
                    color: '#5CC6BA',
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'center'

                },
            }}
            />
        </Stack.Navigator>
    );
}