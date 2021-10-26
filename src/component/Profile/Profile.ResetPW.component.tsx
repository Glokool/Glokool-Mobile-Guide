import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import { Layout } from '@ui-kitten/components'
import auth from '@react-native-firebase/auth';
import { windowWidth, windowHeight } from '../../Design.component';
import { useDispatch } from 'react-redux';
import { profile_loading_start, profile_loading_end } from '../../model/profile/Profile.UI.model';

// 비밀번호 재설정 컴포넌트
export const ProfileResetPassword = () => {

    const dispatch = useDispatch();

    const [wrongPW, setWrongPW] = useState(false);
    const [wrongNewPW, setWrongNewPW] = useState(false);
    const [wrongAgain, setWrongAgain] = useState(false);

    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");

    // 비밀번호 변경 
    const PasswordChange = async () => {

        auth().signInWithEmailAndPassword(auth().currentUser?.email!, password!)
            .then(() => {
                setWrongPW(false);
                dispatch(profile_loading_start());
                if (newPassword.length >= 8 && newPassword === checkPassword) {
                    auth().currentUser?.updatePassword(newPassword)
                        .then(() => {
                            dispatch(profile_loading_end());
                            Alert.alert(
                                "비밀번호 변경",
                                "비밀번호가 변경되었습니다. 다시 로그인 해주세요.",
                                [{
                                    text: "확인",
                                    onPress: () => auth().signOut(),
                                }]
                            )
                        });
                }
            })
            .catch((e) => {
                setWrongPW(true);
                return;
            })

        if (newPassword.length < 8) {
            setWrongNewPW(true);
        } else {
            setWrongNewPW(false);
        }

        if (newPassword != checkPassword) {
            setWrongAgain(true);
        } else {
            setWrongAgain(false);
        }

    }

    return (
        <Layout style={styles.PasswordContainer}>
            <Text style={styles.PasswordText}>비밀번호 변경</Text>
            <TextInput
                style={[styles.TextInputStyle, { borderColor: wrongPW ? '#f77777' : '#d1d1d1' }]}
                placeholder={'현재 비밀번호를 입력해주세요'}
                onChangeText={(e) => setPassword(e)}
                secureTextEntry
            />
            <Layout style={styles.WarningContainer}>
                {wrongPW && <Text style={styles.WarningText}> 잘못된 비밀번호 입니다</Text>}
            </Layout>
            <TextInput
                style={[styles.TextInputStyle, { borderColor: wrongNewPW ? '#f77777' : '#d1d1d1' }]}
                placeholder={'새 비밀번호를 입력해주세요 (8자 이상)'}
                onChangeText={(e) => setNewPassword(e)}
                secureTextEntry
            />
            <Layout style={styles.WarningContainer}>
                {wrongNewPW && <Text style={styles.WarningText}> 8자 이상 입력하셔야 합니다</Text>}
            </Layout>
            <TextInput
                style={[styles.TextInputStyle, { borderColor: wrongAgain ? '#f77777' : '#d1d1d1' }]}
                placeholder={'새 비밀번호를 한번 더 입력해주세요'}
                onChangeText={(e) => setCheckPassword(e)}
                secureTextEntry
            />
            <Layout style={styles.WarningContainer}>
                {wrongAgain && <Text style={styles.WarningText}> 비밀번호가 일치하지 않습니다</Text>}
            </Layout>

            <TouchableOpacity style={styles.PasswordButton} onPress={() => PasswordChange()}>
                <Text style={styles.PasswordButtonText}>비밀번호 변경</Text>
            </TouchableOpacity>

        </Layout>
    )
}

const styles = StyleSheet.create({
    PasswordButton: {
        width: windowWidth * 0.9,
        backgroundColor: '#7777ff',
        borderRadius: 8,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: windowHeight * 0.01
    },
    PasswordButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: 'white'
    },
    PasswordContainer: {
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowHeight * 0.03,
        marginTop: windowHeight * 0.02
    },
    PasswordText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        marginBottom: 10,
    },
    TextInputStyle: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: windowHeight * 0.02,
        paddingHorizontal: windowHeight * 0.02,
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
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
    },

})