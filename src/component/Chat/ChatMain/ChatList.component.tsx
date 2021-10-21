import React from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../../Design.component';
import { Location } from '../../../assets/icon/Common';
import moment from 'moment';

export const ChatListComponent = () => {

    const sampleData = true

    return (
        <Layout style={styles.MainContainer}>
            <Layout style={styles.ItemContainer}>
                <Layout style={styles.ItemInfoContainer}>
                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <Text style={styles.LocationText}>지역</Text>
                    </Layout>
                    <Text>{moment(new Date()).format('YYYY.MM.DD')}</Text>
                </Layout>
                <Divider style={styles.Divider} />

                <Layout style={[styles.TravelerContainer, { justifyContent: sampleData ? 'center' : 'space-between' }]}>
                    {!sampleData ?
                        (
                            <Text> 아직 매칭된 여행객이 없습니다.</Text>
                        ) : (
                            <>
                                <Text>현재 참여 인원 수</Text>
                                <Layout>
                                    <Text>14:53</Text>
                                </Layout>
                            </>
                        )}
                </Layout>
            </Layout>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth,
        backgroundColor: '#0000',
        alignItems: 'center'
    },
    ItemInfoContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    ItemContainer: {
        width: windowWidth * 0.9,
        backgroundColor: 'white',
        paddingHorizontal: windowWidth * 0.05
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
        height: windowHeight * 0.15,
        flexDirection: 'row',
        alignItems: 'center',

    }
})