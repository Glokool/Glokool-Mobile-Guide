import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from '../../app.navigator';
import { SceneRoute } from '../../App.route';
import { TourMainScene } from '../../../scene/Tour';

type TourNavigatorParams = AppNavigatorParams & {
    [SceneRoute.TOURMAIN]: undefined;
}

export interface TourMainSceneProps {
    navigation: StackNavigationProp<TourNavigatorParams, SceneRoute.TOURMAIN>;
    route: RouteProp<TourNavigatorParams, SceneRoute.TOURMAIN>;
}

const Stack = createStackNavigator();

export const TourNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.TOURMAIN} component={TourMainScene} />
    </Stack.Navigator>
)