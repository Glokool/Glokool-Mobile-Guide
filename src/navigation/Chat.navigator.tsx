import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from './app.navigator';
import { SceneRoute } from './App.route';


type ChatNavigatorParams = AppNavigatorParams & {
    [SceneRoute.CHATLIST] : undefined;
    [SceneRoute.CHATROOM] : undefined;
}

export interface ChatListSceneProps {
    navigation : StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATLIST>;
    route : RouteProp<ChatNavigatorParams, SceneRoute.CHATLIST>;
}

export interface ChatRoomSceneProps {
    navigation : StackNavigationProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
    route : RouteProp<ChatNavigatorParams, SceneRoute.CHATROOM>;
}

const Stack = createStackNavigator();

export const ChatNavigator = () : React.ReactElement => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SceneRoute.CHATROOM} component={ChatRoomScene}/>
    </Stack.Navigator>
)