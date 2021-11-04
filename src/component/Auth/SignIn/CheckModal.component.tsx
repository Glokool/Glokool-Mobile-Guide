import React, { useState, useEffect, useContext } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity, Linking, } from 'react-native'
import { Button, Divider, Layout, Modal } from '@ui-kitten/components'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../model';
import { checkGuideFalse } from '../../../model/auth/Auth.UI.model';
import { CloseIcon } from '../../../assets/icon/Common';
import { windowWidth } from '../../../Design.component';

export const CheckModal = () => {

    const visible = useSelector((state: RootState) => state.AuthUIModel.checkGuide);
    const dispatch = useDispatch();

    const onPressAppStore = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('itms-apps://apps.apple.com/kr/app/glokool-seoul-travel-guide/id1558793884');
        } else {
            Linking.openURL('https://play.google.com/store/apps/details?id=com.glokool&hl=ko&gl=US');
        }
    }

    return (
        <Modal
            visible={visible}
            backdropStyle={{ backgroundColor: '#0005' }}
            onBackdropPress={() => dispatch(checkGuideFalse())}
        >
            <Layout style={styles.ModalContainer}>
                <TouchableOpacity style={styles.CloseButton} onPress={() => dispatch(checkGuideFalse())}>
                    <CloseIcon />
                </TouchableOpacity>

                <Text style={styles.ModalTitle}>로그인 실패</Text>
                <Text style={styles.ModalDesc}>
                    글로쿨 가이드 앱은 Travel Assistant 로 등록된 사용자만이 로그인할 수 있습니다.
                </Text>
                <Text style={styles.ModalDesc}>
                    Travel Assistant 계정을 생성하고 싶으시다면 TA 지원하기 버튼을,
                    글로쿨 모바일 앱을 이용하고 싶으시다면 앱 스토어로 이동 버튼을 눌러주세요.
                </Text>

                <Layout style={styles.ButtonsContainer}>
                    <TouchableOpacity onPress={() => onPressAppStore()} style={[styles.Button, { borderRightWidth: 0.3, borderRightColor: '#333' }]}>
                        <Text style={[styles.ButtonText, { color: '#444' }]}>앱 스토어로 이동</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => Linking.openURL('https://forms.gle/2H88ZFCQ3NbH1KDu6')} style={styles.Button}>
                        <Text style={[styles.ButtonText, { color: '#5656ff' }]}>TA 지원하기</Text>
                    </TouchableOpacity>
                </Layout>

            </Layout>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalContainer: {
        width: windowWidth * 0.9,
        padding: windowWidth * 0.05,
        borderRadius: 15,
        backgroundColor: '#dddd',
        paddingBottom: 10
    },
    ModalTitle: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 21,
        color: '#000',
        marginBottom: 15,
        alignSelf: 'center',
    },
    ModalDesc: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14.5,
        marginTop: 5,
        color: '#222',
        marginHorizontal: 5,
        letterSpacing: 0.7,
    },
    CloseButton: {
        alignSelf: 'flex-end',
        width: 20,
        height: 20
    },
    ButtonsContainer: {
        backgroundColor: '#0000',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: '#333',
        borderTopWidth: 0.3,
        marginTop: 20,
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 17,
        color: '#7777ff',
    },
    Button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10
    }
})