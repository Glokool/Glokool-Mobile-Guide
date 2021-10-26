import React, { useState } from 'react';
import { StyleSheet, Text, Platform, TouchableOpacity, Alert, ViewStyle } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../Design.component';
import { ArrowLeft } from '../../assets/icon/Common';
import { useNavigation } from '@react-navigation/core';
import { string } from 'yup/lib/locale';

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