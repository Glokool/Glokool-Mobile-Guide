import React from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../../Design.component';
import { Location } from '../../../assets/icon/Common';
import moment from 'moment';
import { NavigatorRoute, SceneRoute } from '../../../navigation/App.route';
import { ChatMainSceneProps } from '../../../navigation/SceneNavigator/Chat/Chat.navigator';
import axios from 'axios';
import { SERVER } from '../../../server';
import { AuthContext } from '../../../context';
import { TourItem } from '../../Tour';
import AsyncStorage from '@react-native-async-storage/async-storage';



// 현재 채팅 목록 나타내는 리스트
export const ChatListComponent = (props: ChatMainSceneProps) => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const [chat, setChat] = React.useState(false);
    const [time, setTime] = React.useState<Date | undefined>(undefined);
    const [data, setData] = React.useState<TourItem | undefined>(undefined);

    const count = 0;

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            InitChatList();
        });
        

        return unsubscribe;
    }, [])

    const InitChatList = async() => {

        const token = await auth().currentUser?.getIdToken();
        const url = SERVER + '/guides/' + currentUser.gid + '/chat-rooms?q=today'
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }


        axios.get(url, config)
            .then(async(response) => {                        
                setData(response.data);

                var data : any = response.data;
                var state : any = await AsyncStorage.getItem(`ChatCheck_${data._id}`);

                if (state != null) {
                    setTime(new Date(state));
                }

                else { 
                    setTime(undefined);
                }
                          
            })
            .catch((err) => {
                console.log('에러', err.response);
            })         

    }

    return (
        <Layout style={styles.MainContainer}>
            <Text style={styles.TourText}>진행중인 투어</Text>
            {data ? (
                // 오늘 진행되는 투어가 있을 때
                <TouchableOpacity style={styles.ItemContainer} onPress={() => props.navigation.navigate(NavigatorRoute.CHAT, {
                    screen : SceneRoute.CHATROOM,
                    params : { 
                        id : data._id,
                        travelDate : data.travelDate,
                        zone : data.zone
                    }
                })}>
                    <Layout style={styles.ItemInfoContainer}>
                        <Layout style={styles.LocationContainer}>
                            <Location />
                            <Text style={styles.LocationText}>{(data.zone === 'hongdae')? '홍대' : '광화문' }</Text>
                        </Layout>
                        <Text>{moment(new Date()).format('YYYY.MM.DD')}</Text>
                    </Layout>
                    <Divider style={styles.Divider} />

                    <Layout style={[styles.TravelerContainer, { justifyContent: data ? 'space-around' : 'space-between' }]}>
                        {(data.userCount === 0) ?
                            (
                                // 매칭이 안됐을 때
                                <Text style={styles.NotMatchedText}>아직 매칭된 여행객이 없습니다</Text>
                            ) : (
                                // 매칭이 되었을 때
                                <>
                                    <Layout style={styles.ChatUsersContainer}>
                                        <Text style={styles.ChatUsersText}>현재 참여 인원 수</Text>
                                        <Text style={styles.ChatUsersNum}>{data.userCount}</Text>
                                    </Layout>

                                    {(time != undefined)?
                                        <Layout style={styles.UnreadMessageContainer}>
                                            <Text style={styles.UnreadMessageTime}>{moment(time).format('hh:mm')}</Text>
                                            <Layout style={[styles.UnreadMessageCount, { backgroundColor: '#7777ff' }]}>
                                                <Text style={styles.UnreadMessageCountText}>{}</Text>
                                            </Layout>
                                        </Layout>
                                    :
                                        null
                                    }


                                </>
                            )}
                    </Layout>
                </TouchableOpacity>
            ) : (
                // 오늘 진행되는 투어가 없을 때
                <Text style={styles.NoTourText}>오늘 진행되는 투어가 없습니다</Text>
            )}


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
    NoTourText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: '#ababab',
        textAlign: 'center',
        alignSelf: 'center',
        marginTop: windowHeight * 0.1
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
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 10,
        height: 10,
        paddingVertical: 10,
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