
import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet, TouchableWithoutFeedback, Text, TouchableOpacity } from 'react-native'
import { SignInData } from '../../../model/auth/auth.validation.model';
import { Button, Icon, Layout } from '@ui-kitten/components';
import { FormikProps } from 'formik';
import { FomikInputComponent } from './Formik.Input.component';
import { useDispatch } from 'react-redux';
import { loading_end, loading_start } from '../../../model/auth/auth.model';
import { windowHeight, windowWidth } from '../../../Design.component';
import { AuthContext } from '../../../context';
import axios from 'axios';
import { SERVER } from '../../../server';


export const FormikComponent = (props: FormikProps<SignInData>): React.ReactFragment => {

    const FirebaseAuth = auth();
    const dispatch = useDispatch();
    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    //Re-Rendering이 자주 일어나지 않는 UI 관련 Hook
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
    const [authError, setAuthError] = useState<string>("");

    //비밀번호 입력창 Icon rendering
    const renderIcon = (props: any): React.ReactElement => (
        <TouchableWithoutFeedback onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon {...props} name={!passwordVisible ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    //컨트롤을 위한 코드 (분리 가능)
    function SignIn(values: SignInData): void {

        dispatch(loading_start());

        if (values.email != "" || values.password != "") {
            //빈칸일 경우 진행하지 않음
            FirebaseAuth.signInWithEmailAndPassword(values.email, values.password)
                .then((response) => {

                    dispatch(loading_end());

                    // const userInfo = {
                    //     displayName: response.user.displayName,
                    //     email: response.user.email,
                    //     photoURL: response.user.photoURL,
                    //     uid: response.user.uid,
                    //     access_token: '',
                    // }
                    // setCurrentUser(userInfo);

                })
                .catch((err) => {
                    setAuthError(err.code);
                    dispatch(loading_end())
                })
        }

    }

    return (
        <React.Fragment>
            <Layout style={styles.InputContainer}>
                <Text style={styles.InputTitle}>이메일</Text>
                <FomikInputComponent
                    id='email'
                    style={styles.FormikInputContainer}
                    textStyle={styles.PlaceholderText}
                    placeholder='이메일을 입력해주세요.'
                    keyboardType='email-address'
                    authError={authError === 'auth/invalid-email' || authError == 'auth/user-not-found'}
                />
                <Layout style={styles.WarningContainer}>
                    {authError === 'auth/invalid-email' && (<Text style={styles.WarningText}>잘못된 이메일 형식입니다</Text>)}
                    {authError === 'auth/user-not-found' && (<Text style={styles.WarningText}>가입되지 않은 사용자입니다</Text>)}
                </Layout>
            </Layout>

            <Layout style={styles.InputContainer}>
                <Text style={styles.InputTitle}>비밀번호</Text>
                <FomikInputComponent
                    id='password'
                    style={styles.FormikInputContainer}
                    textStyle={styles.PlaceholderText}
                    placeholder='비밀번호를 입력해주세요.'
                    accessoryRight={renderIcon}
                    secureTextEntry={!passwordVisible}
                    authError={authError === 'auth/wrong-password'}
                />
                <Layout style={styles.WarningContainer}>
                    {authError === 'auth/wrong-password' && (<Text style={styles.WarningText}>잘못된 비밀번호입니다</Text>)}
                </Layout>
            </Layout>


            <TouchableOpacity style={styles.LoginButton} onPress={() => SignIn(props.values)}>
                <Text style={styles.LoginButtonText}>로그인</Text>
            </TouchableOpacity>

        </React.Fragment>
    )

}

const styles = StyleSheet.create({
    LoginButton: {
        width: windowWidth * 0.9,
        backgroundColor: '#7777ff',
        borderRadius: 8,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: windowHeight * 0.05
    },
    LoginButtonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: 'white'
    },
    InputContainer: {
        width: windowWidth * 0.9,
        marginVertical: 15
    },
    InputTitle: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#7777ff'
    },
    PlaceholderText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 18,
    },
    FormikInputContainer: {

    },
    WarningContainer: {
        backgroundColor: '#0000',
        height: 20,
        justifyContent: 'center',
    },
    WarningText: {
        color: '#f77777',
        fontFamily: 'Pretendard-Regular',
        fontSize: windowHeight * 0.016,
    }
})