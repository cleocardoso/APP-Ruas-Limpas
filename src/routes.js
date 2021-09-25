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
                 title: 'Registre-se',  headerTitleStyle: {                  
                    textAlign: 'center',
                    left:-90,
                    fontSize: 25,
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                },
                headerStyle: {
                    backgroundColor: '#5CC6BA',
                },
            }} />
            <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Stack.Screen name='Reclame' component={Reclame} options={{
                title: 'Reclamação',  headerTitleStyle: {                  
                    textAlign: 'center',
                    left:-90,
                    fontSize: 25,
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                },
                headerStyle: {
                    backgroundColor: '#5CC6BA',
                }
            }}
            />

            <Stack.Screen name='ListarReclame' component={ListarReclame} options={{                         
                title: 'Minhas Reclamações',  headerTitleStyle: {                  
                    textAlign: 'center',
                    left:-40,
                    fontSize: 24,
                    fontWeight: 'bold',
                    color:'#FFFFFF'
                },
                headerStyle: {
                    backgroundColor: '#5CC6BA',
                },
            }}
            />
        </Stack.Navigator>
    );
}