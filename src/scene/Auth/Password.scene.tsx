import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../Design.component';
import { PasswordSceneProps } from '../../navigation/Auth.navigator';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { TopTab_GoBack } from '../../component/Common';

// 비밀번호 초기화 화면
export const PasswordScene = (props: PasswordSceneProps) => {

    const [email, setEmail] = useState<string>("");
    const [authError, setAuthError] = useState<string>("");

    const [isValid, setIsValid] = useState(true);
    const [isMember, setIsMember] = useState(true);

    // 이메일 초기화 버튼 클릭
    const onPressButton = () => {
        auth().sendPasswordResetEmail(email)
            .then((response) => {
                setAuthError("");
                Alert.alert(
                    "비밀번호 재설정",
                    "성공적으로 이메일을 전송하였습니다. 해당 이메일을 확인해주세요.",
                    [{
                        text: "확인",
                        onPress: () => props.navigation.pop(),
                        style: "default"
                    }]
                )
            })
            .catch((e) => {
                // 에러코드 분류 -> 유효하지 않은 이메일, 가입되지 않은 이메일
                setAuthError(e.code);
            });
    }

    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.InnerContainer}>

                <TopTab_GoBack title="비밀번호 찾기" />

                <Layout>
                    <Text style={styles.InputTitle}>가입한 이메일</Text>
                    <TextInput
                        style={[styles.InputContainer, { borderBottomColor: authError !== "" ? '#FE8686' : '#c9c9c9' }]}
                        placeholderTextColor={'#c9c9c9'}
                        placeholder={'가입한 이메일을 입력해주세요'}
                        keyboardType={'email-address'}
                        onChangeText={(e) => setEmail(e)}
                    />
                    <Layout style={styles.WarningContainer}>
                        {authError === 'auth/invalid-email' && (<Text style={styles.WarningText}>잘못된 이메일 형식입니다</Text>)}
                        {authError === 'auth/user-not-found' && (<Text style={styles.WarningText}>가입되지 않은 사용자입니다</Text>)}
                    </Layout>
                </Layout>

                <TouchableOpacity style={styles.ResetButton} onPress={() => onPressButton()}>
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
    InputContainer: {
        backgroundColor: '#00ff0000',
        borderColor: '#00ff0000',
        borderBottomWidth: 2,
        borderRadius: 2,
        alignItems: 'center',
        width: windowWidth * 0.9,
        fontSize: 16,
        fontFamily: 'Pretendard-Medium',
        paddingVertical: 5,
        paddingLeft: 5,
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
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: 'white'
    },
    WarningContainer: {
        backgroundColor: '#0000',
        height: 20,
        justifyContent: 'center',
    },
    WarningText: {
        color: '#f77777',
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
    }
})