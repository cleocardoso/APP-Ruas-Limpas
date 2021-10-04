import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileAdmin } from '../../pages/admin/ProfileAdmin';
const Stack = createStackNavigator();

export default function ProfileRoute() {
    return (
        <Stack.Navigator initialRouteName="ProfileAdm">
           <Stack.Screen name='ProfileAdm' component={ProfileAdmin} options={{ 
                title: 'Profile',
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}