import React, { } from 'react';
import { StyleSheet, Platform, Text, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../../Design.component';
import { CloseIcon } from '../../../assets/icon/Common';
import { SNSicon_FB } from '../../../assets/icon/Chat';

export const ChatUserModal = () => {
    return (
        <Modal
            visible={true}
            style={styles.MainContainer}
            backdropStyle={styles.BackDrop}
        >
            <Layout style={styles.ButtonsContainer}>
                <Layout style={styles.ReportButton}>
                    <Text style={styles.ReportButtonText}>신고</Text>
                </Layout>
                <CloseIcon />
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
        fontSize: 15,
        color: '#aeaeae',
        flex: 1.1,
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
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
    }
})