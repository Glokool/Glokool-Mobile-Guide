import React, { useState } from 'react';
import { StyleSheet, Platform, Text, TouchableOpacity, Alert, TextInput, Linking } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ArrowLeft } from '../../assets/icon/Common';
import { windowWidth, windowHeight } from '../../Design.component';
import { ChatReportSceneProps } from '../../navigation/SceneNavigator/Chat/Chat.navigator';

export const ChatReportScene = (props: ChatReportSceneProps) => {

    const [reportText, setReportText] = useState<string>("");
    const phoneNumber = '07043000833';

    return (
        <Layout style={styles.MainContainer}>
            <Layout style={styles.TopTabContainer}>
                <TouchableOpacity style={styles.SideContainer} onPress={() => props.navigation.pop()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <Text style={styles.TopTabBarText}>신고</Text>
                <TouchableOpacity style={styles.ReportButton}>
                    <Text style={styles.ReportText}>신고하기</Text>
                </TouchableOpacity>
            </Layout>

            <Layout style={styles.InnerContainer}>
                <Text style={styles.TitleText}>신고하는 이유를 자세히 알려주세요</Text>

                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(e) => setReportText(e)}
                    style={styles.TextInputStyle}
                    placeholder={'예시) 도배/욕설 메세지, 불법 정보, 음란성/선정성 등'}
                    placeholderTextColor={'#d1d1d1'}
                />

                <Text style={[styles.EmergencyText, { color: '#FE8686' }]}>* 긴급한 상황일 경우 글로쿨 관리자에게 문의해주세요</Text>
                <Text style={[styles.EmergencyText, { color: '#c3c3c3' }]} onPress={()=>{Linking.openURL(`tel:${phoneNumber}`)}}>문의처 : 070-4300-0833</Text>
            </Layout>

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    TopTabBarText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        textAlign: 'center',
        flex: 5,
    },
    TopTabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingHorizontal: windowWidth * 0.05,
        paddingBottom: 20,
    },
    SideContainer: {
        height: windowWidth * 0.07,
        justifyContent: 'center',
        flex: 2,
    },
    InnerContainer: {
        marginTop: windowHeight * 0.06
    },
    TextInputStyle: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.6,
        borderWidth: 2,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        padding: 10,
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        marginVertical: windowHeight * 0.02
    },
    TitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        marginLeft: windowWidth * 0.03
    },
    EmergencyText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        marginVertical: 1,
        marginLeft: windowWidth * 0.03
    },
    ReportButton: {
        backgroundColor: '#7777ff',
        borderRadius: 10,
        paddingVertical: windowHeight * 0.01,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    ReportText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 14,
        color: 'white'
    }
})