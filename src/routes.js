import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './pages/Login';
import { Cadastro } from './pages/Cadastro';
import { Home } from './pages/Home';

const Stack = createStackNavigator();

export function Routes(){
    return( 
        <Stack.Navigator>
            <Stack.Screen name='login' component={Login}  options={{ headerShown: false  }}  />
            <Stack.Screen name='Cadastro' component={ Cadastro }   options={{headerTitleAlign: 'center', title: 'Cadastro', headerTitleStyle: {
                fontSize: 25,
                color: '#5CC6BA',
                fontWeight: 'bold',
                textAlign: 'center'
            }, } }/>
            <Stack.Screen name='Home' component={Home}  options={{  title: 'Home' }}  />
            
        </Stack.Navigator>
    );
}