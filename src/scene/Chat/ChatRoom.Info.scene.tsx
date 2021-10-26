import React, { } from 'react';
import { StyleSheet, Platform, Text, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../Design.component';
import { ArrowLeft } from '../../assets/icon/Common';
import { ChatRoomInfoSceneProps } from '../../navigation/SceneNavigator/Chat/Chat.navigator';
import { ChatUserModal } from '../../component/Chat';
import { useDispatch } from 'react-redux';
import { setChatModalVisiblityTrue } from '../../model/chat/Chat.UI.model';
import { TopTab_GoBack } from '../../component/Common';

export const ChatRoomInfoScene = (props: ChatRoomInfoSceneProps) => {

    const dispatch = useDispatch();

    const sampleData = ['Sarah', 'Wendy', 'Jack', 'Kevin', 'Github', 'React Native', 'Flutter'];

    const renderItem = (item) => {
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