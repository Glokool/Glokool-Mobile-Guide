import React, { } from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../Design.component';
import { ChatRoomInfoSceneProps } from '../../navigation/SceneNavigator/Chat/Chat.navigator';
import { ChatUserModal } from '../../component/Chat';
import { useDispatch } from 'react-redux';
import { setChatModalVisiblityTrue } from '../../model/chat/Chat.UI.model';
import { TopTab_GoBack } from '../../component/Common';
import { SERVER } from '../../server';
import axios from 'axios';

// 채팅 참여자 목록 화면
export const ChatRoomInfoScene = (props: ChatRoomInfoSceneProps) => {

    const dispatch = useDispatch();

    const sampleData = ['Sarah', 'Wendy', 'Jack', 'Kevin', 'Github', 'React Native', 'Flutter'];

    const InitChatRoomInfo = async() => {
        
        const token = await auth().currentUser?.getIdToken();
        const url = SERVER + '/chat-rooms/' + props.route.params.id + '/people';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }

        axios.get(url, config)
            .then((response) => {

            })
            .catch((err) => {
                
            })


    }



    // 리스트 아이템 렌더링
    const renderItem = (item : {item : any, index : number}) => {
        return (
            <Layout style={styles.ItemContainer}>
                <Layout style={styles.ProfileContainer}>
                    <Image source={require('../../assets/image/Common/GloGray.png')} style={styles.ImageContainer} resizeMode="contain" />
                    <Text style={styles.NameText}>{item.item}</Text>
                </Layout>

                <TouchableOpacity style={styles.DetailsButton} onPress={() => dispatch(setChatModalVisiblityTrue())}>
                    <Text style={styles.DetailsButtonText}>예약정보</Text>
                </TouchableOpacity>
            </Layout>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            <TopTab_GoBack title={'채팅방 정보'} />

            <FlatList
                data={sampleData}
                renderItem={renderItem}
                ListHeaderComponent={<Text style={styles.TitleText}>여행객 리스트</Text>}
            />
            {/* 참여자 프로필 모달 */}
            <ChatUserModal navigation={props.navigation}/>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#f9f9f9'
    },
    ImageContainer: {
        width: windowWidth * 0.11,
        height: windowWidth * 0.11,
    },
    ProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0000',
    },
    ItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#0000',
        justifyContent: 'space-between',
        width: windowWidth * 0.9,
        paddingVertical: windowHeight * 0.006
    },
    DetailsButton: {
        borderWidth: 2,
        borderColor: '#7777ff',
        borderRadius: 100,
        paddingVertical: windowHeight * 0.002,
        paddingHorizontal: windowWidth * 0.03
    },
    DetailsButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#7777ff'
    },
    NameText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        marginLeft: 10
    },
    TitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 17,
        marginVertical: 10,
        paddingTop: 20
    }
})