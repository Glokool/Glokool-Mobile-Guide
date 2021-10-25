import React from 'react';
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../../Design.component';
import { Location } from '../../../assets/icon/Common';
import moment from 'moment';
import { SceneRoute } from '../../../navigation/App.route';
import { ChatMainSceneProps } from '../../../navigation/SceneNavigator/Chat.navigator';

export const ChatListComponent = (props: ChatMainSceneProps) => {

    const sampleData = false
    const count = 12

    return (
        <Layout style={styles.MainContainer}>
            <Text style={styles.TourText}>진행중인 투어</Text>
            <TouchableOpacity style={styles.ItemContainer} onPress={() => props.navigation.navigate(SceneRoute.CHAT_ROOM_INFO)}>
                <Layout style={styles.ItemInfoContainer}>
                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <Text style={styles.LocationText}>지역</Text>
                    </Layout>
                    <Text>{moment(new Date()).format('YYYY.MM.DD')}</Text>
                </Layout>
                <Divider style={styles.Divider} />

                <Layout style={[styles.TravelerContainer, { justifyContent: sampleData ? 'center' : 'space-between' }]}>
                    {sampleData ?
                        (
                            <Text style={styles.NotMatchedText}>아직 매칭된 여행객이 없습니다.</Text>
                        ) : (
                            <>
                                <Layout style={styles.ChatUsersContainer}>
                                    <Text style={styles.ChatUsersText}>현재 참여 인원 수</Text>
                                    <Text style={styles.ChatUsersNum}>10</Text>
                                </Layout>
                                <Layout style={styles.UnreadMessageContainer}>
                                    {count > 0 && <Text style={styles.UnreadMessageTime}>14:53</Text>}
                                    <Layout style={[styles.UnreadMessageCount, { backgroundColor: count > 0 ? '#7777ff' : '#cdcdcd' }]}>
                                        <Text style={styles.UnreadMessageCountText}>{count}</Text>
                                    </Layout>
                                </Layout>
                            </>
                        )}
                </Layout>
            </TouchableOpacity>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth,
        paddingHorizontal: windowWidth * 0.05,
        backgroundColor: '#0000',
        flex: 2,
    },
    ItemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    ItemContainer: {
        alignSelf: 'center',
        width: windowWidth * 0.9,
        backgroundColor: 'white',
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowHeight * 0.02,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        elevation: 2,
        borderRadius: 10,
    },
    LocationContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    LocationText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        marginLeft: 5,
    },
    DateText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)'
    },
    Divider: {
        backgroundColor: '#eee',
        marginVertical: windowHeight * 0.01,
    },
    TravelerContainer: {
        width: '100%',
        height: windowHeight * 0.15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    NotMatchedText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        color: '#acacac'
    },
    ChatUsersContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ChatUsersText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 17
    },
    ChatUsersNum: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 20,
        color: '#7777ff',
        marginLeft: 5
    },
    UnreadMessageTime: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 12,
        color: '#929292'
    },
    UnreadMessageCount: {
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 3,
    },
    UnreadMessageCountText: {
        fontFamily: 'BrandonGrotesque-Bold',
        fontSize: 19,
        color: 'white',
    },
    UnreadMessageContainer: {
        alignItems: 'center',
    },
    TourText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18,
        color: '#3f3f44',
        marginVertical: windowHeight * 0.03
    }
})