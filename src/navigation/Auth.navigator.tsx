import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from './app.navigator';
import { SceneRoute } from './App.route';
import { SignInScene } from '../scene/Auth';

type AuthNavigatorParams = AppNavigatorParams & {
    [SceneRoute.SIGNIN] : undefined;
    [SceneRoute.SIGNUP] : undefined;
}

export interface SignInSceneProps {
    navigation : StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGNIN>;
    route : RouteProp<AuthNavigatorParams, SceneRoute.SIGNIN>;
}

export interface SignUpSceneProps {
    navigation : StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGNUP>;
    route : RouteProp<AuthNavigatorParams, SceneRoute.SIGNUP>;
}

const Stack = createStackNavigator();

export const AuthNavigator = () : React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.SIGNIN} component={SignInScene}/>
    </Stack.Navigator>
)