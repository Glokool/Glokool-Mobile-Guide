import React from 'react';
import { RouteProp } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParams } from './app.navigator';
import { NavigatorRoute, SceneRoute } from './App.route';
import { ProfileNavigator } from './SceneNavigator/Profile.navigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatNavigator } from './SceneNavigator/Chat.navigator';
import { ChatIconSelected, ChatIconUnselected, DailyIconSelected, DailyIconUnselected, ProfileIconSelected, ProfileIconUnselected } from '../assets/icon/BottomTab';
import { DailyNavigator } from './SceneNavigator/Tour.Navigator';
import { windowHeight } from '../Design.component';

type MainNavigatorParams = AppNavigatorParams & {
    [SceneRoute.HOME]: undefined;
}

export interface HomeSceneProps {
    navigation: StackNavigationProp<MainNavigatorParams, SceneRoute.HOME>;
    route: RouteProp<MainNavigatorParams, SceneRoute.HOME>;
}


const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export const MainNavigator = (): React.ReactElement => (
    // <Stack.Navigator screenOptions={{ headerShown: false }}>
    //     <Stack.Screen name={SceneRoute.HOME} component={HomeScene} />
    //     <Stack.Screen name={NavigatorRoute.PROFILE} component={ProfileNavigator} />
    // </Stack.Navigator>
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: '#7777ff',
            tabBarInactiveTintColor: '#C3C6D6',
            tabBarStyle: {
                backgroundColor: 'white',
                height: windowHeight * 0.1,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
            },
            tabBarIconStyle: {
                bottom: -5
            }
        })}
    >
        <Tab.Screen
            name={NavigatorRoute.CHAT}
            component={ChatNavigator}
            options={{
                tabBarLabel: '글로챗',
                tabBarIcon: ({ focused }) => (
                    focused ? <ChatIconSelected /> : <ChatIconUnselected />
                )
            }}
        />
        <Tab.Screen
            name={NavigatorRoute.DAILY}
            component={DailyNavigator}
            options={{
                tabBarLabel: '일정',
                tabBarIcon: ({ focused }) => (
                    focused ? <DailyIconSelected /> : <DailyIconUnselected />
                )
            }}
        />
        <Tab.Screen
            name={NavigatorRoute.PROFILE}
            component={ProfileNavigator}
            options={{
                tabBarLabel: '내 정보',
                tabBarIcon: ({ focused }) => (
                    focused ? <ProfileIconSelected /> : <ProfileIconUnselected />
                )
            }}
        />
    </Tab.Navigator>
)