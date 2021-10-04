import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { HomeAdmin } from '../../pages/admin/HomeAdmin';
const Stack = createStackNavigator();

export default function AdminRoute() {
    return (
        <Stack.Navigator initialRouteName="HomeRoute">
           <Stack.Screen name='HomeRoute' component={HomeAdmin} options={{ 
                title: 'Home',
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}