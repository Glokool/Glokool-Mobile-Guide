import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { TourMainSceneProps } from '../../navigation/SceneNavigator/Tour/Tour.Main.Navigator';
import { windowWidth } from '../../Design.component';
import { TourTopNavigator } from '../../navigation/SceneNavigator/Tour/Tour.TopNavigator';
import { TopTab_NoButton } from '../../component/Common';

// 일정 메인 화면
export const TourMainScene = (props: TourMainSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            <TopTab_NoButton title={'내 투어 일정'} />
            {/* 상단에 예정된 투어, 지난 투어 위한 navigator */}
            <TourTopNavigator />
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