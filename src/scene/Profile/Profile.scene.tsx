import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner, Text, Input, Button } from '@ui-kitten/components';

import axios from 'axios';
import auth from '@react-native-firebase/auth';

import { useDispatch, useSelector } from 'react-redux';
import { loading_end, loading_start } from '../../model/auth/auth.model';
import { RootState } from '../../model';

import { Formik } from 'formik';
import { ProfileFormik } from '../../component/Profile/Profile.Formik.component';
import { ProfileValidationModel } from '../../model/profile/profile.validation.model';

import { ProfileSceneProps } from '../../navigation/SceneNavigator/Profile.navigator';
import { SERVER } from '../../server';
import { GuideInfoType } from './type';

export const ProfileScene = (props: ProfileSceneProps): React.ReactElement => {

    const [guideInfo, setGuideInfo] = useState<GuideInfoType>();

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.AuthLoadingModel.loading);

    const UID = auth().currentUser?.uid;

    useEffect(() => {
        InitGuideInfo();
    }, [])

    // 가이드 정보 가져오는 부분
    const InitGuideInfo = () => {
        dispatch(loading_start());

        axios.get(`${SERVER}/api/guides/` + UID)
            .then((response) => {
                setGuideInfo(response.data);
                dispatch(loading_end());
            })
            .catch((e) => console.log(e));
    }

    return loading ? (
        <Layout style={styles.MainContainer}>
            <Spinner status={'info'} />
        </Layout>
    ) : (
        <Layout style={styles.MainContainer}>

            {/* Formik 으로 가이드 정보 전달해줍니다 */}
            <Formik
                initialValues={{
                    ...guideInfo,
                    email: guideInfo?.email,
                    name: guideInfo?.name,
                    contact: guideInfo?.contact,
                    oneLineIntro: guideInfo?.oneLineIntro,
                    intro: guideInfo?.intro,
                }}
                validationData={ProfileValidationModel}
                onSubmit={() => { }}
                navigation={props.navigation}
            >
                {ProfileFormik}
            </Formik>

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})