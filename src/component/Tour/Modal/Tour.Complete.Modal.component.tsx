import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Layout, Divider, Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../../Design.component';
import moment from 'moment';
import { CloseIcon } from '../../../assets/icon/Common';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { setTourCompleteVisibilityFalse } from '../../../model/tour/Tour.UI.Model';
import { TourItem } from '..';

// 종료된 투어 나타내는 모달
export const TourCompleteModal = (props : {item : TourItem}) => {

    const visibility = useSelector((state: RootState) => state.TourUIModel.CompleteVisibility);
    const dispatch = useDispatch();

    return (
        <Modal
            visible={visibility}
            style={styles.MainContainer}
            backdropStyle={styles.BackDrop}
            onBackdropPress={() => dispatch(setTourCompleteVisibilityFalse())}
        >
            <Layout style={styles.CloseContainer}>
                <TouchableOpacity style={styles.CloseButton} onPress={() => dispatch(setTourCompleteVisibilityFalse())}>
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
                {(props.item.userCount != 0)?
                    <Text style={[styles.ValueText, { color: '#7777ff' }]}>종료된 투어</Text>
                    :
                    <Text style={[styles.ValueText, { color: '#F77777' }]}>매칭 실패 투어</Text>
                }
            </Layout>

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
})