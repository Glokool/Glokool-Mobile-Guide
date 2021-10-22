import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../../Design.component';
import { NewTourIcon } from '../../../assets/icon/Chat';
import { ChatMainSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';

export const NewTourButton = (props: ChatMainSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            <Text style={styles.TitleText}>
                더 많은 여행객들이 기다리고 있어요!
            </Text>
            <TouchableOpacity style={styles.ButtonContainer}>
                <Text style={styles.ButtonText}>새 투어 등록하기</Text>
                <NewTourIcon />
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        backgroundColor: '#0000',
        alignItems: 'center',
        paddingBottom: windowHeight * 0.05
    },
    TitleText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#8c8c8c',
        marginBottom: windowHeight * 0.01
    },
    ButtonContainer: {
        backgroundColor: '#7777ff',
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: windowWidth * 0.07,
        paddingVertical: windowHeight * 0.015
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: 'white',
        marginRight: 10,
    }
})