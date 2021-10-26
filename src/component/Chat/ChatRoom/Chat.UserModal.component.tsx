import React, { } from 'react';
import { StyleSheet, Platform, Text, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../../Design.component';
import { CloseIcon } from '../../../assets/icon/Common';
import { SNSicon_FB } from '../../../assets/icon/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setChatModalVisiblityFalse } from '../../../model/chat/Chat.UI.model';
import { useNavigation } from '@react-navigation/core';
import { SceneRoute } from '../../../navigation/App.route';

// 채팅 이용자 프로필 모달
export const ChatUserModal = (props: any) => {

    const Visibility = useSelector((state: RootState) => state.ChatUIModel.ChatModalVisibility);
    const dispatch = useDispatch();

    // 신고 버튼 클릭 시
    const onPressReport = () => {
        dispatch(setChatModalVisiblityFalse());
        props.navigation.navigate(SceneRoute.CHAT_REPORT);
    }

    return (
        <Modal
            visible={Visibility}
            style={styles.MainContainer}
            backdropStyle={styles.BackDrop}
            onBackdropPress={() => dispatch(setChatModalVisiblityFalse())}
        >
            <Layout style={styles.ButtonsContainer}>
                <TouchableOpacity style={styles.ReportButton} onPress={() => onPressReport()}>
                    <Text style={styles.ReportButtonText}>신고</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CloseButton} onPress={() => dispatch(setChatModalVisiblityFalse())}>
                    <CloseIcon />
                </TouchableOpacity>
            </Layout>

            <Image
                source={require('../../../assets/image/Common/GloGray.png')}
                style={styles.ImageContainer}
                resizeMode="contain"
            />

            <Text style={styles.NameText}>Glokool</Text>

            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>이메일</Text>
                <Text style={styles.ValueText}>glokoolofficial@gmail.com</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>연락처</Text>
                <Text style={styles.ValueText}>01087245922</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>비상연락처</Text>
                <Layout style={styles.snsContainer}>
                    <SNSicon_FB />
                    <Text style={[styles.ValueText, { marginLeft: 5 }]}>glokoolofficial</Text>
                </Layout>
            </Layout>


        </Modal>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth * 0.9,
        padding: windowWidth * 0.05,
        paddingBottom: windowHeight * 0.05,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    },
    BackDrop: {
        backgroundColor: '#0008'
    },
    ButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    ReportButton: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#a2a2a2',
        paddingVertical: 5,
        paddingHorizontal: windowWidth * 0.04
    },
    ReportButtonText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 12,
        color: '#a2a2a2'
    },
    ImageContainer: {
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: windowHeight * 0.006,
        justifyContent: 'space-between',
        width: '85%'
    },
    KeyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth*0.035,
        color: '#aeaeae',
        flex: 1.1,
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth*0.035,
        flex: 2.5,
    },
    snsContainer: {
        flexDirection: 'row',
        flex: 2.5,
        alignItems: 'center',
    },
    NameText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        marginTop: windowHeight * 0.01,
        marginBottom: windowHeight * 0.02
    },
    CloseButton: {
        width: windowWidth * 0.05,
        height: windowWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    }
})