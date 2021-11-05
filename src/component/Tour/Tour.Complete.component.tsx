import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../Design.component';
import moment from 'moment';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import { Location } from '../../assets/icon/Common';
import { TourMainSceneProps } from '../../navigation/SceneNavigator/Tour/Tour.Main.Navigator';
import { TourCompleteModal, TourItem } from '.';
import { useDispatch } from 'react-redux';
import { setTourCompleteVisibilityTrue } from '../../model/tour/Tour.UI.Model';
import { AuthContext } from '../../context';
import axios from 'axios';
import { SERVER } from '../../server';
import { useFocusEffect } from '@react-navigation/core';


// 종료된 투어들 렌더링해주는 리스트
export const TourCompleteList = (props: TourMainSceneProps) => {

    const dispatch = useDispatch()
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = React.useState<Array<TourItem>>([]);
    const [selectedTourItem, setSelectedTourItem] = React.useState<TourItem>({
        zone: '',
        maxUserNum: 0,
        userCount: 0,
        travelDate: '',
        _id: ''
    });

    const tourComplete = false;
    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    useFocusEffect(() => {
        InitChatList();
    })

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        InitChatList();
        setTimeout(() => setRefreshing(false), 500);
    }, []);

    const InitChatList = async () => {

        const token = await auth().currentUser?.getIdToken();
        const url = (SERVER + '/guides/' + currentUser.gid + '/chat-rooms?q=' + 'past');
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
                console.log("완료한 투어 : ", err);
                // showMessage({
                //     message: "서버 통신에 실패하였습니다. 다시 시도해주세요.",
                //     type: "danger",
                //     icon: "danger",
                // });
            })

    }


    const renderItem = (item: { item: TourItem, index: number }) => {
        return (
            <TouchableOpacity style={styles.ItemContainer} onPress={() => dispatch(setTourCompleteVisibilityTrue())} >

                <Layout style={styles.TopContainer}>
                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <Text style={styles.LocationText}>
                            {(item.item.zone === 'hongdae') ? '홍대' : ''}
                            {(item.item.zone === 'gwanghwamun') ? '광화문' : ''}
                            {(item.item.zone === 'myeongdong') ? '명동' : ''}
                            {(item.item.zone === 'gangnam') ? '강남' : ''}
                        </Text>
                    </Layout>

                    {(item.item.userCount != 0) ? (
                        <Text style={styles.TourStatus}>종료된 투어</Text>
                    ) : (
                        <Text style={[styles.TourStatus, { color: '#b5b5b5' }]}>매칭 실패 투어</Text>
                    )}
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            <TourCompleteModal item={selectedTourItem} />
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
    },
    TopContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    TourStatus: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
    }
})