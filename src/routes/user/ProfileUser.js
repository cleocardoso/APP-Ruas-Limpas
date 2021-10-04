import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileUser } from '../../pages/user/ProfileUser';
const Stack = createStackNavigator();

export default function ProfileUserRoute() {
    return (
        <Stack.Navigator initialRouteName="ProfileUser">
           <Stack.Screen name='ProfileUser' component={ProfileUser} options={{ 
                title: 'Profile',
                headerShown: false
            }} />
        </Stack.Navigator>
    );
}