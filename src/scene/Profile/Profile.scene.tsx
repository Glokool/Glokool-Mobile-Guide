import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner, Text, Input, Button } from '@ui-kitten/components';

import { ProfileSceneProps } from '../../navigation/Profile.navigator';
import { SERVER, CDN } from '../../server';

import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GuideInfoType } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { Formik } from 'formik';
import { loading_end, loading_start } from '../../model/auth/auth.model';
import { ProfileFormik } from '../../component/Profile/Profile.Formik.component';
import { ProfileValidationModel } from '../../model/profile/profile.validation.model';

export const ProfileScene = (props: ProfileSceneProps): React.ReactElement => {

    const [guideInfo, setGuideInfo] = useState<GuideInfoType>();

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.AuthLoadingModel.loading);


    const UID = auth().currentUser?.uid;

    useEffect(() => {
        InitGuideInfo();
    }, [])

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
            {/* <FastImage source={{ uri: CDN + guideInfo?.avatar }} style={styles.ImageItem} /> */}

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
    ImageItem: {
        width: 150,
        height: 150
    },
    ItemContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },

})