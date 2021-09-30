import React from 'react';
import { StyleSheet } from 'react-native'
import { Layout, Button } from '@ui-kitten/components'
import { SignInSceneProps } from '../../navigation/Auth.navigator';
import { FormikComponent } from '../../component/Auth/SignIn/Formik.component';
import { AuthValidationModel, SignInData } from '../../model/auth/auth.validation.model';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import { RootState } from '../../model';



export const SignInScene = (props : SignInSceneProps) => {

    //로그인 상황 확인을 위한 Loading 상태 관리
    const loading = useSelector((state : RootState) => state.AuthLoadingModel.loading);

    return(
        <Layout>
          {loading?
            <Layout style={styles.LoadingContainer}>

            </Layout>
            :
            null
          }

          <Formik
            initialValues={SignInData.empty()}
            validationSchema={AuthValidationModel}
            onSubmit={() => {}}>
            {FormikComponent}
          </Formik>

        </Layout>
    )
}

const styles = StyleSheet.create({

  LoadingContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor : 'rgba(0,0,0,0.5)'
  }

})