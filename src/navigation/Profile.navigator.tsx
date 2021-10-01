import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from './app.navigator';
import { SceneRoute } from './App.route';
import { ProfileScene } from '../scene/Profile';

type ProfileNavigatorParams = AppNavigatorParams & {
    [SceneRoute.PROFILE]: undefined;
}

export interface ProfileSceneProps {
    navigation: StackNavigationProp<ProfileNavigatorParams, SceneRoute.PROFILE>;
    route: RouteProp<ProfileNavigatorParams, SceneRoute.PROFILE>;
}


const Stack = createStackNavigator();

export const ProfileNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.PROFILE} component={ProfileScene} />
    </Stack.Navigator>
)