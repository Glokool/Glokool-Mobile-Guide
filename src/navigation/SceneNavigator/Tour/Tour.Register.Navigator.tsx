import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from '../../app.navigator';
import { SceneRoute } from '../../App.route';
import { RegisterMainScene, RegisterSuccessScene } from '../../../scene/Register';

type RegisterNavigatorParams = AppNavigatorParams & {
    [SceneRoute.REGISTERMAIN]: undefined;
    [SceneRoute.REGISTERSUCCESS]: {
        location:string;
        date: any;
        traveler: number;
    };
}

export interface RegisterMainSceneProps {
    navigation: StackNavigationProp<RegisterNavigatorParams, SceneRoute.REGISTERMAIN>;
    route: RouteProp<RegisterNavigatorParams, SceneRoute.REGISTERMAIN>;
}

export interface RegisterSuccessSceneProps {
    navigation: StackNavigationProp<RegisterNavigatorParams, SceneRoute.REGISTERSUCCESS>;
    route: RouteProp<RegisterNavigatorParams, SceneRoute.REGISTERSUCCESS>;
}

const Stack = createStackNavigator();

export const RegisterNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.REGISTERMAIN} component={RegisterMainScene} />
        <Stack.Screen name={SceneRoute.REGISTERSUCCESS} component={RegisterSuccessScene} />
    </Stack.Navigator>
)