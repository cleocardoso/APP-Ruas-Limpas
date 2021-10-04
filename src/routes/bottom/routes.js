import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Reclame } from '../../pages/reclame/Reclame';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ProfileRoute from '../admin/Profile';
import UserRoute from '../user/UserRoute'
import ProfileUserRoute from '../user/ProfileUser';
import AdminRoute from '../admin/AdminRoute';

const Bottom = createBottomTabNavigator();

function setOptions({ title, tabBarIcon, headerShown}) {
    return {
        title,
        headerShown: headerShown ? headerShown : false,
        tabBarIcon: tabBarIcon,
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "#686868",
        tabBarActiveBackgroundColor: "#f5f5f5",
    };
}

export function Admin() {
    return (
        <Bottom.Navigator initialRouteName='HomeAdmin'>
            <Bottom.Screen name='HomeAdmin' component={AdminRoute} options={{
                ...setOptions({
                    title: 'Home',
                    tabBarIcon: () => <AntDesign name="home" color="#686868" size={28} />
                })
            }} />
            <Bottom.Screen name='ProfileAdmin' component={ProfileRoute} options={{
                ...setOptions({
                    title: 'Profile',
                    tabBarIcon: () => <AntDesign name="user" color="#686868" size={28} />
                }),
            }} />
            <Bottom.Screen name='LixeiraAdmin' component={Reclame} options={{
                ...setOptions({
                    title: 'Lixeira',
                    tabBarIcon: () => <EvilIcons name="trash" color="#686868" size={28} />
                })
            }}
            />

            <Bottom.Screen name='Sair' component={Reclame} options={{
                ...setOptions({
                    title: 'Sair',
                    tabBarIcon: () => <AntDesign name="logout" color="#f51" size={28} />
                })
            }}
            />
        </Bottom.Navigator>
    );
}

export function User() {
    return (
        <Bottom.Navigator initialRouteName='HomeUser'>
            <Bottom.Screen name='HomeUser' component={UserRoute} options={{
                    ...setOptions({
                        title: 'Home',
                        tabBarIcon: () => <AntDesign name="home" color="#686868" size={28} />
                    })
                }} 
            />
            <Bottom.Screen name='ProfileUserRoute' component={ProfileUserRoute} options={{
                    ...setOptions({
                        title: 'User',
                        tabBarIcon: () => <AntDesign name="user" color="#686868" size={28} />
                    })
                }} 
            />
            <Bottom.Screen name='LixeiraUser' component={Reclame} options={{
                    ...setOptions({
                        title: 'Lixeira',
                        tabBarIcon: () => <EvilIcons name="trash" color="#686868" size={28} />
                    })
                }}
            />

            <Bottom.Screen name='Sair' component={Reclame} options={{
                    ...setOptions({
                        title: 'Sair',
                        tabBarIcon: () => <AntDesign name="logout" color="#f51" size={28} />
                    })
                }}
            />
        </Bottom.Navigator>
    );
}