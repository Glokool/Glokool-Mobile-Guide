import React from 'react';
import { StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../Design.component';
import { ArrowLeft } from '../../assets/icon/Common';
import { PasswordSceneProps } from '../../navigation/Auth.navigator';
import { TextInput } from 'react-native-gesture-handler';

export const PasswordScene = (props: PasswordSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.InnerContainer}>
                <Layout style={styles.TopTabContainer}>
                    <TouchableOpacity style={styles.SideContainer} onPress={() => props.navigation.pop()}>
                        <ArrowLeft />
                    </TouchableOpacity>
                    <Text style={styles.TopTabBarText}>비밀번호 찾기</Text>
                    <Layout style={styles.SideContainer} />
                </Layout>

                <Layout>
                    <Text style={styles.InputTitle}>가입한 이메일</Text>
                    <TextInput
                        style={styles.InputContainer}
                        placeholderTextColor={'#c9c9c9'}
                        placeholder={'가입한 이메일을 입력해주세요'}
                        keyboardType={'email-address'}
                    />
                </Layout>

                <TouchableOpacity style={styles.ResetButton} onPress={() => { }}>
                    <Text style={styles.ResetButtonText}>비밀번호 재설정 이메일 보내기</Text>
                </TouchableOpacity>
            </Layout>

        </Layout >
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    InnerContainer: {
        width: '100%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    TopTabBarText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
    },
    TopTabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingHorizontal: windowWidth * 0.05
    },
    SideContainer: {
        width: windowWidth * 0.07,
        height: windowWidth * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
    InputContainer: {
        backgroundColor: '#00ff0000',
        borderColor: '#00ff0000',
        borderBottomColor: '#c9c9c9',
        borderBottomWidth: 2,
        borderRadius: 2,
        alignItems: 'center',
        width: windowWidth * 0.9,
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        paddingVertical: 5,
        marginTop: 10
    },
    InputTitle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#7777ff',
    },
    ResetButton: {
        width: windowWidth * 0.9,
        backgroundColor: '#7777ff',
        borderRadius: 8,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: windowHeight * 0.05
    },
    ResetButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: 'white'
    },
})