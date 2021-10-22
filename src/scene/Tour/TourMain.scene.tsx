import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { DailyMainSceneProps } from '../../navigation/SceneNavigator/Tour.Navigator';
import { windowWidth } from '../../Design.component';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TourCompleteList, TourScheduleList } from '../../component/Tour';
import { DailyTopNavigator } from '../../component/Tour/Tour.TopNavigator';

const Tab = createMaterialTopTabNavigator();

export const DailyMainScene = (props: DailyMainSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.TopTabContainer}>
                <Text style={styles.TopTabBarText}>내 투어 일정</Text>
            </Layout>

            <DailyTopNavigator />
        </Layout>
    )
}

const styles = StyleSheet.create({
    TopTabBarText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
    },
    TopTabContainer: {
        alignItems: 'center',
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        paddingBottom: 20,
    },
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
    },
})