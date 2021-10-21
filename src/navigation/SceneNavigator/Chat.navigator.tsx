import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from '../app.navigator';
import { SceneRoute } from '../App.route';
import { ChatRoomScene, ChatMainScene } from '../../scene/Chat';

type ChatNavigatorParams = AppNavigatorParams & {
    [SceneRoute.CHATMAIN]: undefined;
    [SceneRoute.CHATLIST]: undefined;
    [SceneRoute.CHATROOM]: undefined;
}

export interface ChatMainSceneProps {
    navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATMAIN>;
    route: RouteProp<ChatNavigatorParams, SceneRoute.CHATMAIN>;
}

export interface ChatListSceneProps {
    navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATLIST>;
    route: RouteProp<ChatNavigatorParams, SceneRoute.CHATLIST>;
}

export interface ChatRoomSceneProps {
    navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
    route: RouteProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
}

const Stack = createStackNavigator();

export const ChatNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.CHATMAIN} component={ChatMainScene} />
        <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScene} />
    </Stack.Navigator>
)