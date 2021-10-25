import React from 'react';
import { NavigatorRoute, SceneRoute } from './App.route';
import { ProfileNavigator } from './SceneNavigator/Profile.navigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ChatMainScene } from '../scene/Chat';
import { ChatIconSelected, ChatIconUnselected, TourIconSelected, TourIconUnselected, ProfileIconSelected, ProfileIconUnselected } from '../assets/icon/BottomTab';
import { TourNavigator } from './SceneNavigator/Tour/Tour.Main.Navigator';
import { windowHeight } from '../Design.component';
import { isIphoneX } from 'react-native-iphone-x-helper';

const Tab = createBottomTabNavigator();

export const MainNavigator = (): React.ReactElement => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#7777ff',
            tabBarInactiveTintColor: '#C3C6D6',
            tabBarStyle: {
                backgroundColor: 'white',
                height: windowHeight * 0.1,
                paddingTop: isIphoneX() ? 15 : 0,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
            },
            tabBarIconStyle: {
            },
        })}
    >
        <Tab.Screen
            name={SceneRoute.CHATMAIN}
            component={ChatMainScene}
            options={({ route }) => ({
                tabBarLabel: '글로챗',
                tabBarIcon: ({ focused }) => (
                    focused ? <ChatIconSelected /> : <ChatIconUnselected />
                ),

            })}
        />
        <Tab.Screen
            name={NavigatorRoute.TOUR}
            component={TourNavigator}
            options={{
                tabBarLabel: '일정',
                tabBarIcon: ({ focused }) => (
                    focused ? <TourIconSelected /> : <TourIconUnselected />
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