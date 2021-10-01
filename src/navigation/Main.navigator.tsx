import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from './app.navigator';
import { NavigatorRoute, SceneRoute } from './App.route';
import { HomeScene } from '../scene/Main';
import { ProfileNavigator } from './Profile.navigator';

type MainNavigatorParams = AppNavigatorParams & {
    [SceneRoute.HOME]: undefined;
}

export interface HomeSceneProps {
    navigation: StackNavigationProp<MainNavigatorParams, SceneRoute.HOME>;
    route: RouteProp<MainNavigatorParams, SceneRoute.HOME>;
}


const Stack = createStackNavigator();

export const MainNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.HOME} component={HomeScene} />
        <Stack.Screen name={NavigatorRoute.PROFILE} component={ProfileNavigator}/>
    </Stack.Navigator>
)