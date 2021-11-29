import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { windowWidth } from '../../Design.component';
import { ProfileDetailSceneProps } from '../../navigation/SceneNavigator/Profile.navigator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { AngleRight } from '../../assets/icon/Common';
import { LoadingComponent, TopTab_GoBack } from '../../component/Common';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProfileGuideInfo, ProfileResetPassword } from '../../component/Profile';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { profileLoadingSuccess } from '../../model/profile/Profile.UI.model';
import auth from '@react-native-firebase/auth'
import axios from 'axios';
import { SERVER } from '../../server';

// 내 정보 관리 화면
export const ProfileDetailScene = (props: ProfileDetailSceneProps) => {

    const dispatch = useDispatch();
    const InitLoading = useSelector((state: RootState) => state.AuthUIModel.loading);
    const PWLoading = useSelector((state: RootState) => state.ProfileUIModel.loading);
    const loadingState = useSelector((state: RootState) => state.ProfileUIModel.loadingSuccess);

    useEffect(() => {
        if (!loadingState) {
            showMessage({
                message: "서버 통신에 실패하였습니다. 다시 시도해주세요.",
                type: "danger",
                icon: "danger",
            });
        } else {
            hideMessage();
        }
    }, [loadingState])

    // 탈퇴 버튼 클릭
    const onPressWithdrawal = async () => {
        const userToken = await auth().currentUser?.getIdToken();

        const config = {
            headers: {
                Authorization: `Bearer ${userToken}`,
                "Content-Type": "application/json",
            }
        }

        Alert.alert(
            "가이드 탈퇴",
            "탈퇴하기 버튼을 누르면, 글로쿨 가이드앱의 모든 정보가 즉시 삭제되며, 복구할 수 없습니다. 정말로 탈퇴하시겠습니까? 탈퇴를 희망하신다면, sungsoo@glokool.com 으로 문의주세요.",
            [{
                text: "확인",
                onPress: () => {
                    axios.delete(SERVER + '/guides', config)
                        .then((response) => { auth().signOut(); })
                        .catch((e) => console.log(e));
                }
            }]
        )
    }

    return loadingState ? (
        <Layout style={styles.MainContainer}>

            <TopTab_GoBack title={'프로필 관리'} style={styles.TopTabContainer} />

            <ScrollView style={styles.ScrollViewStyle} showsVerticalScrollIndicator={false}>

                {/* 프로필 부분 컴포넌트 */}
                <ProfileGuideInfo />

                {/* 비밀번호 재설정 컴포넌트 */}
                <ProfileResetPassword />

                {/* 탈퇴버튼 */}
                <TouchableOpacity style={styles.FlatButton} onPress={() => onPressWithdrawal()}>
                    <Text style={styles.FlatButtonText}>{'탈퇴하기'}</Text>
                    <AngleRight />
                </TouchableOpacity>
                <SafeAreaView />

            </ScrollView>

            {/* 가이드 정보 로딩 혹은 비밀번호 변경 로딩 */}
            {PWLoading || InitLoading && <LoadingComponent />}
        </Layout>
    ) : (
        <Layout style={styles.MainContainer}>
            <TouchableOpacity
                onPress={() => {
                    dispatch(profileLoadingSuccess());
                }}>
                <Text style={styles.ReloadMessage}>탭하여 재시도하기</Text>
            </TouchableOpacity>
            <FlashMessage autoHide={false} />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ScrollViewStyle: {
        width: windowWidth,
    },
    TopTabContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    FlatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: windowWidth * 0.05,
        marginTop: 10,
        backgroundColor: 'white'
    },
    FlatButtonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18
    },
    ReloadMessage: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 20,
        color: '#555'
    }

})