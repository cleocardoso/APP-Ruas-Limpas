import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../../pages/user/Home';
import { Reclame } from '../../pages/reclame/Reclame'
import { ListarReclame } from '../../pages/reclame/ListarReclame'
const Stack = createStackNavigator();

export default function UserRoute() {
    return (
        <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name='Home' component={Home} options={{ 
                title: 'Home',
                headerShown: false
            }} />
            <Stack.Screen name="Reclame" component={Reclame} options={{
                title: 'Reclame',
                headerShown: false
            }} /> 
            <Stack.Screen name="ListarReclame" component={ListarReclame} options={{
                title: 'ListarReclame',
                headerShown: false
            }} /> 
        </Stack.Navigator>
    );
}