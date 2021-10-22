import React from 'react';
import { Platform, StyleSheet, Text, } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { SignInSceneProps } from '../../navigation/Auth.navigator';
import { FormikComponent } from '../../component/Auth/SignIn/Formik.component';
import { AuthValidationModel, SignInData } from '../../model/auth/auth.validation.model';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../model';
import { windowWidth } from '../../Design.component';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingComponent } from '../../component/Common';
import { SceneRoute } from '../../navigation/App.route';

export const SignInScene = (props: SignInSceneProps) => {

  //로그인 상황 확인을 위한 Loading 상태 관리
  const loading = useSelector((state: RootState) => state.AuthLoadingModel.loading);

  return (
    <Layout style={styles.MainContainer}>


      <Layout style={styles.TopTabContainer}>
        <Text style={styles.TopTabBarText}>로그인</Text>
      </Layout>

      <Layout style={{ alignItems: 'center' }}>
        <Formik
          initialValues={SignInData.empty()}
          validationSchema={AuthValidationModel}
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

        <TouchableOpacity style={styles.ApplyTAButton}>
          <Text style={styles.ApplyTAText}>Travel Assistant 지원하기</Text>
        </TouchableOpacity>
      </Layout>

      {loading && <LoadingComponent />}

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
  TopTabBarText: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  TopTabContainer: {
    alignItems: 'center',
    width: windowWidth,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
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
    fontFamily: 'Pretendard-Medium',
    fontSize: 14,
    color: '#7777ff'
  },
  MakeAccountText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    color: '#555',
  }
})