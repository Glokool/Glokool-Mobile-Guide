import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner, Text, Input, Button } from '@ui-kitten/components';

import { ProfileSceneProps } from '../../navigation/Profile.navigator';
import { SERVER, CDN } from '../../server';

import axios from 'axios';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import { GuideInfoType } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { FomikInputComponent } from '../../component/Auth/SignIn/Formik.Input.component';

import FastImage from 'react-native-fast-image';

import { loading_end, loading_start } from '../../model/auth/auth.model';

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

    const onPressSubmit = () => {

    }

    return loading ? (
        <Layout style={styles.MainContainer}>
            <Spinner status={'info'} />
        </Layout>
    ) : (
        <Layout style={styles.MainContainer}>
            <FastImage source={{ uri: CDN + guideInfo?.avatar }} style={styles.ImageItem} />

            <Layout style={styles.ItemContainer}>
                <Text>Name</Text>
                <Input value={guideInfo?.name}/>
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Email</Text>
                <Input value={guideInfo?.email} />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Phone</Text>
                <Input value={guideInfo?.contact} keyboardType={'number-pad'} />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>oneLineIntro</Text>
                <Input value={guideInfo?.oneLineIntro} />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Intro</Text>
                <Input value={guideInfo?.intro} />
            </Layout>

            <Text>{guideInfo?.country}</Text>
            <Text>{guideInfo?.gender}</Text>
            <Text>Birthday {moment(guideInfo?.birthDate).format('YYYY.MM.DD')}</Text>
            <Text>{guideInfo?.keyword}</Text>
            {/* <Text>{guideInfo?.lang}</Text> */}

            <Button onPress={() => onPressSubmit()}>
                Save Profile
            </Button>
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