import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from '../app.navigator';
import { SceneRoute } from '../App.route';
import { ChatRoomScene, ChatMainScene, ChatRoomInfoScene, ChatReportScene } from '../../scene/Chat';

type ChatNavigatorParams = AppNavigatorParams & {
    [SceneRoute.CHATMAIN]: undefined;
    [SceneRoute.CHATLIST]: undefined;
    [SceneRoute.CHATROOM]: undefined;
    [SceneRoute.CHAT_ROOM_INFO]: undefined;
    [SceneRoute.CHAT_REPORT]: undefined;
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

export interface ChatRoomInfoSceneProps {
    navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_ROOM_INFO>;
    route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_ROOM_INFO>;
}

export interface ChatReportSceneProps {
    navigation: StackNavigationProp<ChatNavigatorParams, SceneRoute.CHAT_REPORT>;
    route: RouteProp<ChatNavigatorParams, SceneRoute.CHAT_REPORT>;
}

const Stack = createStackNavigator();

export const ChatNavigator = (): React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.CHATMAIN} component={ChatMainScene} />
        <Stack.Screen name={SceneRoute.CHAT_ROOM_INFO} component={ChatRoomInfoScene} />
        <Stack.Screen name={SceneRoute.CHAT_REPORT} component={ChatReportScene} />
        <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScene} />
    </Stack.Navigator>
)