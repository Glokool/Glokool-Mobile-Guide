import React, { useState, useContext, useCallback } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { Location } from '../../assets/icon/Common';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { windowWidth, windowHeight } from '../../Design.component';
import { NewTourButton } from '../Chat';
import { TourMainSceneProps } from '../../navigation/SceneNavigator/Tour/Tour.Main.Navigator';
import { useDispatch } from 'react-redux';
import { setTourScheduleVisibilityTrue } from '../../model/tour/Tour.UI.Model';
import { TourItem, TourScheduleModal } from '.';
import axios from 'axios';
import { AuthContext } from '../../context';
import { SERVER } from '../../server';
import { useFocusEffect } from '@react-navigation/core';

// 예정된 투어 렌더링 리스트
export const TourScheduleList = (props: TourMainSceneProps) => {

    const dispatch = useDispatch();
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState<Array<TourItem>>([]);
    const [selectedTourItem, setSelectedTourItem] = useState<TourItem>({
        zone: '',
        maxUserNum: 0,
        userCount: 0,
        travelDate: '',
        _id: ''
    });

    useFocusEffect(() => {
        InitChatList();
    });

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        InitChatList();
        setTimeout(() => setRefreshing(false), 500);
    }, []);

    const InitChatList = async () => {

        const token = await auth().currentUser?.getIdToken();
        const url = (SERVER + '/guides/' + currentUser.gid + '/chat-rooms?q=' + 'future');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }

        axios.get(url, config)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                console.log("예정된 투어 : ", err);
                // showMessage({
                //     message: "서버 통신에 실패하였습니다. 다시 시도해주세요.",
                //     type: "danger",
                //     icon: "danger",
                // });
            })

    }


    const renderItem = (item: { item: TourItem, index: number }) => {
        return (
            <TouchableOpacity
                style={styles.ItemContainer}
                onPress={() => {
                    setSelectedTourItem(item.item);
                    dispatch(setTourScheduleVisibilityTrue());
                }}
            >
                <Layout style={styles.LocationContainer}>
                    <Location />
                    <Text style={styles.LocationText}>
                        {(item.item.zone === 'hongdae') ? '홍대' : ''}
                        {(item.item.zone === 'gwanghwamun') ? '광화문' : ''}
                        {(item.item.zone === 'myeongdong') ? '명동' : ''}
                        {(item.item.zone === 'gangnam') ? '강남' : ''}
                    </Text>
                </Layout>

                <Divider style={styles.Divider} />

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.KeyText}>투어일</Text>
                    <Text style={styles.ValueText}>{item.item.travelDate}</Text>
                </Layout>

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.KeyText}>투어 종류</Text>
                    <Text style={styles.ValueText}>{(item.item.maxUserNum === 1) ? 'Private Chat' : 'Group Chat'}</Text>
                </Layout>

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.KeyText}>동시 진행 인원</Text>
                    <Text style={styles.ValueText}>{item.item.maxUserNum}명</Text>
                </Layout>

            </TouchableOpacity>
        )
    }

    return (
        <Layout style={styles.MainContainer}>
            <FlatList
                data={data}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <Layout style={{ marginTop: 10, backgroundColor: '#0000' }}>
                        <NewTourButton {...props} />
                    </Layout>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <TourScheduleModal item={selectedTourItem} />
            
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
        backgroundColor: '#0000',
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