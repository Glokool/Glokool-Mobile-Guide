import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import { Layout, Spinner, Input, Button, Icon } from '@ui-kitten/components';

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
import { LoadingComponent } from '../../component/Common';

import { windowWidth, windowHeight } from '../../Design.component';
import { AngleRight, ArrowLeft, CloseIcon } from '../../assets/icon/Common';
import { SceneRoute } from '../../navigation/App.route';

export const ProfileScene = (props: ProfileSceneProps): React.ReactElement => {

    const [guideInfo, setGuideInfo] = useState<GuideInfoType>();

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.AuthLoadingModel.loading);

    const UID = auth().currentUser?.uid;

    useEffect(() => {
        InitGuideInfo();
        console.log(auth().currentUser);
    }, [])

    // 가이드 정보 가져오는 부분
    const InitGuideInfo = () => {
        dispatch(loading_start());
        console.log(UID);

        axios.get(`${SERVER}/api/guides/` + UID)
            .then((response) => {
                setGuideInfo(response.data);

                dispatch(loading_end());
            })
            .catch((e) => console.log(e));
    }

    return loading ? (
        <LoadingComponent />
    ) : (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.TopTabContainer}>
                <Text style={styles.TopTabBarText}>내 정보</Text>
            </Layout>

            <Layout style={styles.WelcomeContainer}>
                <Text style={[styles.WelcomeText, { color: '#bbb' }]}>안녕하세요</Text>
                <Text style={styles.WelcomeText}>{auth().currentUser?.displayName}</Text>
                <Text style={[styles.WelcomeText, { color: '#bbb' }]}>트래블 어시스턴트님!</Text>

                <TouchableOpacity style={styles.ProfileDetailButton} onPress={() => props.navigation.navigate(SceneRoute.PROFILE_DETAIL)}>
                    <Text style={styles.ProfileDetailText}>프로필 관리</Text>
                </TouchableOpacity>
            </Layout>

            <TouchableOpacity style={styles.FlatButton}>
                <Text style={styles.FlatButtonText}>{'공지사항 & FAQ'}</Text>
                <AngleRight />
            </TouchableOpacity>

            <TouchableOpacity style={styles.FlatButton} onPress={() => auth().signOut()}>
                <Text style={styles.FlatButtonText}>{'로그아웃'}</Text>
                <AngleRight />
            </TouchableOpacity>

            {/* Formik 으로 가이드 정보 전달해줍니다
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
            </Formik> */}

        </Layout >
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
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
    WelcomeContainer: {
        width: windowWidth * 0.9,
        paddingTop: windowHeight * 0.15
    },
    WelcomeText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 30,
        marginTop: 5,
    },
    ProfileDetailButton: {
        width: windowWidth * 0.9,
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#7777ff',
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25,
    },
    ProfileDetailText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#7777ff',
    },
    FlatButton: {
        flexDirection: 'row',
        width: windowWidth * 0.9,
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    FlatButtonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18
    }
})