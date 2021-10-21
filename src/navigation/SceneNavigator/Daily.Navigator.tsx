import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from '../app.navigator';
import { SceneRoute } from '../App.route';
import { DailyMainScene } from '../../scene/Daily';

type DailyNavigatorParams = AppNavigatorParams & {
    [SceneRoute.DAILYMAIN]: undefined;
}

export interface DailyMainSceneProps {
    navigation: StackNavigationProp<DailyNavigatorParams, SceneRoute.DAILYMAIN>;
    route: RouteProp<DailyNavigatorParams, SceneRoute.DAILYMAIN>;
}

const Stack = createStackNavigator();

export const DailyNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.DAILYMAIN} component={DailyMainScene} />
    </Stack.Navigator>
)