import React from 'react';
import { StyleSheet, Text, Linking } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { SignInSceneProps } from '../../navigation/Auth.navigator';
import { FormikComponent } from '../../component/Auth/SignIn/Formik.component';
import { SignInData } from '../../model/auth/auth.validation.model';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../model';
import { windowWidth } from '../../Design.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingComponent } from '../../component/Common';
import { SceneRoute } from '../../navigation/App.route';
import { TopTab_NoButton } from '../../component/Common';
import { CheckModal } from '../../component/Auth/SignIn';

// 로그인 화면
export const SignInScene = (props: SignInSceneProps) => {

    //로그인 상황 확인을 위한 Loading 상태 관리
    const loading = useSelector((state: RootState) => state.AuthUIModel.loading);

    return (
        <Layout style={styles.MainContainer}>

            <TopTab_NoButton title={'로그인'} />

            <Layout style={{ alignItems: 'center' }}>
                <Formik
                    initialValues={SignInData.empty()}
                    onSubmit={() => { }}>
                    {FormikComponent}
                </Formik>

                <TouchableOpacity onPress={() => props.navigation.navigate(SceneRoute.PASSWORD)}>
                    <Text style={styles.ForgotPassword}>
                        {'비밀번호 찾기 > '}
                    </Text>
                </TouchableOpacity>

            </Layout>

            <Layout style={{ alignItems: 'center' }}>
                <Text style={styles.MakeAccountText}>아직 계정이 없으신가요?</Text>

                <TouchableOpacity style={styles.ApplyTAButton} onPress={() => Linking.openURL('https://forms.gle/2H88ZFCQ3NbH1KDu6')}>
                    <Text style={styles.ApplyTAText}>Travel Assistant 지원하기</Text>
                </TouchableOpacity>
            </Layout>

            {loading && <LoadingComponent />}
            <CheckModal />

        </Layout>
    )
}

const styles = StyleSheet.create({
    LoadingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    ForgotPassword: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#848484',
        marginTop: windowWidth * 0.05
    },
    ApplyTAButton: {
        width: windowWidth * 0.9,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#7777ff',
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    ApplyTAText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        color: '#7777ff'
    },
    MakeAccountText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#555',
    }
})