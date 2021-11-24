import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from './app.navigator';
import { SceneRoute } from './App.route';
import { SignInScene, SignUpScene, PasswordScene, PolicyScene_01, PolicyScene_02, SignUpSuccessScene } from '../scene/Auth';

type AuthNavigatorParams = AppNavigatorParams & {
    [SceneRoute.SIGNIN]: undefined;
    [SceneRoute.SIGNUP]: undefined;
    [SceneRoute.SIGNUP_SUCCESS]: undefined;
    [SceneRoute.PASSWORD]: undefined;
    [SceneRoute.POLICY_01]: undefined;
    [SceneRoute.POLICY_02]: undefined;
}

export interface SignInSceneProps {
    navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGNIN>;
    route: RouteProp<AuthNavigatorParams, SceneRoute.SIGNIN>;
}

export interface SignUpSceneProps {
    navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.SIGNUP>;
    route: RouteProp<AuthNavigatorParams, SceneRoute.SIGNUP>;
}

export interface PasswordSceneProps {
    navigation: StackNavigationProp<AuthNavigatorParams, SceneRoute.PASSWORD>;
    route: RouteProp<AuthNavigatorParams, SceneRoute.PASSWORD>;
}

const Stack = createStackNavigator();

export const AuthNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.SIGNIN} component={SignInScene} />
        <Stack.Screen name={SceneRoute.SIGNUP} component={SignUpScene} />
        <Stack.Screen name={SceneRoute.SIGNUP_SUCCESS} component={SignUpSuccessScene} />
        <Stack.Screen name={SceneRoute.PASSWORD} component={PasswordScene} />
        <Stack.Screen name={SceneRoute.POLICY_01} component={PolicyScene_01} />
        <Stack.Screen name={SceneRoute.POLICY_02} component={PolicyScene_02} />
    </Stack.Navigator>
)