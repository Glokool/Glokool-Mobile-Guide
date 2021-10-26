import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Layout, Divider, Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../../Design.component';
import moment from 'moment';
import { CloseIcon } from '../../../assets/icon/Common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setTourScheduleVisibilityFalse } from '../../../model/tour/Tour.UI.Model';

// 예정된 투어 나타내는 모달
export const TourScheduleModal = () => {
    const visibility = useSelector((state: RootState) => state.TourUIModel.ScheduleVisibility);
    const dispatch = useDispatch();

    const tourComplete = true;

    const onPressCancel = () => {
        Alert.alert(
            "투어 취소",
            "정말 취소하시겠습니까? 취소한 투어는 복구되지 않습니다.",
            [{
                text: "아니오",
                style: "destructive"
            }, {
                text: "네",
                onPress: () => dispatch(setTourScheduleVisibilityFalse()),
            }]
        )
    }

    const onPressPolicy = () => {
        Alert.alert(
            "투어 취소정책",
            "투어일 기준 1일 전까지 투어 취소가 가능합니다. 등록된 투어는 반드시 진행되어야 하며, 노쇼 (취소 절차 없이 무단으로 투어 진행에 임하지 않음) 의 경우 TA 자격이 정지됩니다.",
            [{
                text: "확인"
            }]
        )
    }

    return (
        <Modal
            visible={visibility}
            style={styles.MainContainer}
            backdropStyle={styles.BackDrop}
            onBackdropPress={() => dispatch(setTourScheduleVisibilityFalse())}
        >
            <Layout style={styles.CloseContainer}>
                <TouchableOpacity style={styles.CloseButton} onPress={() => dispatch(setTourScheduleVisibilityFalse())}>
                    <CloseIcon />
                </TouchableOpacity>
            </Layout>

            <Text style={styles.TitleText}>투어 상세정보</Text>

            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>투어 지역</Text>
                <Text style={styles.ValueText}>홍대</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>투어일</Text>
                <Text style={styles.ValueText}>{moment(new Date()).format('YYYY.MM.DD')} 10AM ~ 7PM</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>투어 종류</Text>
                <Text style={styles.ValueText}>Private Chat</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>동시 진행 가능 인원</Text>
                <Text style={styles.ValueText}>1명</Text>
            </Layout>

            <Divider style={styles.Divider} />

            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>투어 진행 상태</Text>
                <Text style={[styles.ValueText, { color: '#7777ff' }]}>예정된 투어</Text>
            </Layout>


            <TouchableOpacity style={styles.CancellationContainer} onPress={() => onPressPolicy()}>
                <Text style={styles.CancellationText}>투어 취소 정책</Text>
                <Layout style={styles.QuestionContainer}>
                    <Text style={styles.CancellationText}>?</Text>
                </Layout>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ButtonContainer} onPress={() => onPressCancel()}>
                <Text style={styles.ButtonText}>투어 취소하기</Text>
            </TouchableOpacity>

            <Text style={styles.Notice}>* 정산과 관련된 내용은 공지사항을 참고해주세요</Text>

        </Modal>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth * 0.9,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: windowWidth * 0.1,
        paddingVertical: windowHeight * 0.03
    },
    BackDrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: windowWidth,
        height: windowHeight
    },
    CloseContainer: {
        width: '100%',
        alignItems: 'flex-end'
    },
    CloseButton: {
        width: windowWidth * 0.05,
        height: windowWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    TitleText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 18,
        textAlign: 'center',
        alignSelf: 'center',
        marginBottom: windowHeight * 0.03
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: windowHeight * 0.006,
        justifyContent: 'space-between',
        backgroundColor: '#0000',
    },
    KeyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#aeaeae',
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
    },
    Divider: {
        backgroundColor: '#e1e1e1',
        marginVertical: windowHeight * 0.025,
    },
    CancellationText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 13,
        color: '#787878'
    },
    CancellationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: windowHeight * 0.04
    },
    QuestionContainer: {
        borderWidth: 1.2,
        borderColor: '#787878',
        borderRadius: 100,
        width: windowWidth * 0.05,
        height: windowWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    ButtonContainer: {
        backgroundColor: '#0000',
        borderWidth: 2,
        borderColor: '#7777ff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: windowHeight * 0.018,
        marginVertical: windowHeight * 0.015
    },
    ButtonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#7777ff',
    },
    Notice: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
        color: '#888',
        alignSelf: 'center',
    }
})