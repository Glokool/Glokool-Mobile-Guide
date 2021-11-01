import React from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { Location } from '../../assets/icon/Common';

import { windowWidth, windowHeight } from '../../Design.component';
import moment from 'moment';
import { NewTourButton } from '../Chat';
import { TourMainSceneProps } from '../../navigation/SceneNavigator/Tour/Tour.Main.Navigator';
import { useDispatch } from 'react-redux';
import { setTourScheduleVisibilityTrue } from '../../model/tour/Tour.UI.Model';
import { TourScheduleModal } from '.';

// 예정된 투어 렌더링 리스트
export const TourScheduleList = (props: TourMainSceneProps) => {

    const dispatch = useDispatch();

    const sampleData = [1, 2, 3]

    const renderItem = (item : { item: any, index : number }) => {
        return (
            <TouchableOpacity style={styles.ItemContainer} onPress={() => dispatch(setTourScheduleVisibilityTrue())}>
                <Layout style={styles.LocationContainer}>
                    <Location />
                    <Text style={styles.LocationText}>홍대</Text>
                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.KeyText}>투어일</Text>
                    <Text style={styles.ValueText}>{moment(new Date()).format('YYYY.MM.DD')}</Text>
                </Layout>

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.KeyText}>투어 종류</Text>
                    <Text style={styles.ValueText}>Private Chat</Text>
                </Layout>

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.KeyText}>동시 진행 인원</Text>
                    <Text style={styles.ValueText}>1명</Text>
                </Layout>

            </TouchableOpacity>
        )
    }

    return (
        <Layout style={styles.MainContainer}>
            <FlatList
                data={sampleData}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <Layout style={{ marginTop: 10, backgroundColor: '#0000' }}>
                        <NewTourButton {...props} />
                    </Layout>
                }
            />
            <TourScheduleModal />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
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
        marginVertical: windowHeight * 0.01
    },
    LocationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    LocationText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        marginLeft: 5
    },
    Divider: {
        backgroundColor: '#eee',
        marginVertical: windowHeight * 0.01,
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: windowHeight * 0.005,
        backgroundColor: '#0000',
    },
    KeyText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        flex: 1.3,
        color: '#aeaeae',
    },
    ValueText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        flex: 2
    }
})