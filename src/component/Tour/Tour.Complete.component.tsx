import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../Design.component';
import moment from 'moment';
import { Location } from '../../assets/icon/Common';
import { TourMainSceneProps } from '../../navigation/SceneNavigator/Tour/Tour.Main.Navigator';
import { TourCompleteModal } from '.';
import { useDispatch } from 'react-redux';
import { setTourCompleteVisibilityTrue } from '../../model/tour/Tour.UI.Model';
import { AuthContext } from '../../context';
import axios from 'axios';
import { SERVER } from '../../server';

// 종료된 투어들 렌더링해주는 리스트
export const TourCompleteList = (props: TourMainSceneProps) => {

    const dispatch = useDispatch()

    const sampleData = [1, 2, 3, 4, 5]
    const tourComplete = false;

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    React.useEffect(() => {
        InitChatList();
    }, [])

    const InitChatList = async() => {

        const token = await auth().currentUser?.getIdToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data : JSON.stringify({ date : 'past'})
        }

        axios.get((SERVER + '/guides/' + currentUser.gid + '/chat-rooms'), config)
            .then((response) => {

            })
            .catch((err) => {
                console.log(err);
            })       

    }


    const renderItem = (item : {item : any, index : number }) => {
        return (
            <TouchableOpacity style={styles.ItemContainer} onPress={() => dispatch(setTourCompleteVisibilityTrue())} >

                <Layout style={styles.TopContainer}>
                    <Layout style={styles.LocationContainer}>
                        <Location />
                        <Text style={styles.LocationText}>홍대</Text>
                    </Layout>

                    {tourComplete ? (
                        <Text style={styles.TourStatus}>종료된 투어</Text>
                    ) : (
                        <Text style={[styles.TourStatus, { color: '#b5b5b5' }]}>매칭 실패 투어</Text>
                    )}
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
            />
            <TourCompleteModal />
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