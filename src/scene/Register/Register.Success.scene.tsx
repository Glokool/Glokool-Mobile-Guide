import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { RegisterSuccessSceneProps } from '../../navigation/SceneNavigator/Tour/Tour.Register.Navigator';
import { windowHeight, windowWidth } from '../../Design.component';
import moment from 'moment';

export const RegisterSuccessScene = (props: RegisterSuccessSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.InnerContainer}>
                <Text style={styles.SuccessText}>성공적으로</Text>
                <Text style={styles.SuccessText}>투어 등록을 마쳤습니다.</Text>

                <Layout style={styles.CardContainer}>
                    <Text style={styles.TitleText}>투어 상세정보</Text>

                    <Layout style={styles.InfoContainer}>
                        <Text style={styles.KeyText}>투어 지역</Text>
                        <Text style={styles.ValueText}>{props.route.params.location}</Text>
                    </Layout>
                    <Layout style={styles.InfoContainer}>
                        <Text style={styles.KeyText}>투어일</Text>
                        <Text style={styles.ValueText}>{moment(props.route.params.date).format('YYYY.MM.DD')} 10AM ~ 7PM</Text>
                    </Layout>
                    <Layout style={styles.InfoContainer}>
                        <Text style={styles.KeyText}>투어 종류</Text>
                        <Text style={styles.ValueText}>Private Chat</Text>
                    </Layout>
                    <Layout style={styles.InfoContainer}>
                        <Text style={styles.KeyText}>동시 진행 가능 인원</Text>
                        <Text style={styles.ValueText}>{props.route.params.traveler}명</Text>
                    </Layout>
                </Layout>
            </Layout>

            <TouchableOpacity style={styles.SuccessButton} onPress={() => props.navigation.pop()}>
                <Text style={styles.SuccessButtonText}>확인</Text>
            </TouchableOpacity>

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        alignItems: 'center'
    },
    InnerContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0000'
    },
    CardContainer: {
        width: windowWidth * 0.9,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        elevation: 2,
        borderRadius: 10,
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowWidth * 0.07,
        marginTop: windowHeight * 0.03,
    },
    TitleText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: windowHeight * 0.03
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: windowHeight * 0.006,
        justifyContent: 'space-between',
        backgroundColor: '#0000',
    },
    KeyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#aeaeae',
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },
    SuccessText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 23,
        color: '#7777ff',
        marginTop: 10
    },
    SuccessButton: {
        width: windowWidth * 0.9,
        backgroundColor: '#7777ff',
        borderRadius: 8,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: windowHeight * 0.01
    },
    SuccessButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: 'white'
    },
})