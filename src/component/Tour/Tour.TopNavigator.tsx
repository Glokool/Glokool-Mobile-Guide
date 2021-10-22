import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TourCompleteList, TourScheduleList } from '.';
import { windowWidth } from '../../Design.component';

const Tab = createMaterialTopTabNavigator();

export const DailyTopNavigator = () => (

    <Tab.Navigator
        initialRouteName="일정"
        screenOptions={{
            tabBarLabelStyle: styles.tabBarLabelStyle,
            tabBarItemStyle: styles.tabBarItemStyle,
            tabBarStyle: { backgroundColor: 'white', },
            tabBarActiveTintColor: '#7777ff',
            tabBarInactiveTintColor: '#cdcdcd',
            tabBarIndicatorStyle: { backgroundColor: '#7777ff', }
        }}
    >
        <Tab.Screen name="예정된 투어" component={TourScheduleList} />
        <Tab.Screen name="완료한 투어" component={TourCompleteList} />
    </Tab.Navigator>
)

const styles = StyleSheet.create({
    tabBarLabelStyle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18
    },
    tabBarItemStyle: {
        width: windowWidth * 0.5,

    }
})