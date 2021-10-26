import React from 'react';
import { StyleSheet, Text, Platform, TouchableOpacity, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowWidth } from '../../Design.component';
import { ArrowLeft } from '../../assets/icon/Common';
import { useNavigation } from '@react-navigation/core';

// Top Tab Bar 컴포넌트

// 왼쪽에 뒤로가기 버튼이 있는 탭바
export const TopTab_GoBack = (props: { title: string, style?: ViewStyle }) => {
    const navigation = useNavigation();

    return (
        <Layout style={[styles.TopTabContainer, { flexDirection: 'row' }, props.style]}>
            <TouchableOpacity style={styles.SideContainer} onPress={() => navigation.goBack()}>
                <ArrowLeft />
            </TouchableOpacity>
            <Text style={styles.TopTabBarText}>{props.title}</Text>
            <Layout style={styles.SideContainer} />
        </Layout>
    )
}

// 양쪽에 아무 버튼 없는 탭바
export const TopTab_NoButton = (props: { title: string, style?: ViewStyle }) => {
    return (
        <Layout style={styles.TopTabContainer}>
            <Text style={styles.TopTabBarText}>{props.title}</Text>
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
        justifyContent: 'space-between',
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        paddingHorizontal: windowWidth * 0.05
    },
    SideContainer: {
        width: windowWidth * 0.07,
        height: windowWidth * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
})