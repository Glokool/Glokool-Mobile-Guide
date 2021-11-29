import React from 'react';
import auth from '@react-native-firebase/auth';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Layout, Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../../../Design.component';
import { CloseIcon } from '../../../../assets/icon/Common';
import { SNSicon_FB, SNSicon_IG } from '../../../../assets/icon/Chat';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../model';
import { setChatModalVisiblityFalse } from '../../../../model/chat/Chat.UI.model';
import { SceneRoute } from '../../../../navigation/App.route';
import { Block, Unblock } from '../../../../assets/icon/Chat/ChatRoomInfo';
import axios from 'axios';
import { SERVER } from '../../../../server';
import { useNavigation } from '@react-navigation/core';

interface UserInfo {
    _id : string;
    avatar : string;
    email : string;
    name : string;
    uid : string;
    phone : {
        countryCode: string;
        number : string;
    };
    messenger: {
        id: string;
        platform: string;
    }
}

// 채팅 이용자 프로필 모달
export const ChatUserModal = (props: any) => {

    const navigation = useNavigation();

    const Visibility = useSelector((state: RootState) => state.ChatUIModel.ChatModalVisibility);
    const dispatch = useDispatch();
    const [block, setBlock] = React.useState<Array<String>>([]);
    const data : UserInfo | undefined = props.data;
    const [blockable, setBlockable] = React.useState(false);

   
    React.useEffect(() => {      
       
        console.log("야호 보인다", data?.uid);
        InitModal();

    }, [Visibility])

    const InitModal = async() => {

        const token = await auth().currentUser?.getIdToken();
        var url = SERVER + '/chat-rooms/'+ props.ChatRoomID + '/user/block';
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }

        axios.get(url, config)
            .then((response : any) => {
                setBlock(response.data.blockedUser);

                if (data?.uid != undefined && response.data.blockedUser.indexOf(data?.uid) != -1){                    
                    setBlockable(true);
                }
                else {
                    setBlockable(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }


    // 신고 버튼 클릭 시
    const onPressReport = () => {
        dispatch(setChatModalVisiblityFalse());
        props.navigation.navigate(SceneRoute.CHAT_REPORT, { 
            id : props.ChatRoomID,
            uid : data?.uid
        });
    };

    const onPressBlock = async() => {

        const token = await auth().currentUser?.getIdToken();

        console.log(data?.uid);

        const blockData = JSON.stringify({
            uid : data?.uid
        });

        const config = {
            headers : {
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            }            
        };
        
        axios.post((SERVER + '/chat-rooms/'+ props.ChatRoomID +'/user/block'), blockData, config)
            .then((response : any) => {
                dispatch(setChatModalVisiblityFalse());
                setBlock(response.data.blockedUser);
                console.log(response.data);

                if (data?.uid != undefined) {
                    if (blockData.indexOf(data?.uid) != -1) {
                        setBlockable(true);
                    }
                }

            })


    }

    return (
        <Modal
            visible={Visibility}
            style={styles.MainContainer}
            backdropStyle={styles.BackDrop}
            onBackdropPress={() => dispatch(setChatModalVisiblityFalse())}
        >
            <Layout style={styles.ButtonsContainer}>
                <TouchableOpacity style={styles.ReportButton} onPress={() => onPressReport()}>
                    <Text style={styles.ReportButtonText}>신고</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.CloseButton} onPress={() => dispatch(setChatModalVisiblityFalse())}>
                    <CloseIcon />
                </TouchableOpacity>
            </Layout>

            <Image
                source={{uri : data?.avatar}}
                style={styles.ImageContainer}
                resizeMode="contain"
            />

            <Text style={styles.NameText}>{data?.name}</Text>

            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>이메일</Text>
                <Text style={styles.ValueText}>{data?.email}</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>연락처</Text>
                <Text style={styles.ValueText}>+{data?.phone.countryCode} {data?.phone.number}123</Text>
            </Layout>
            <Layout style={styles.InfoContainer}>
                <Text style={styles.KeyText}>비상연락처</Text>
                <Layout style={styles.snsContainer}>
                    {data?.messenger.platform === 'Facebook'? <SNSicon_FB /> : <SNSicon_IG /> }
                    <Text style={[styles.ValueText, { marginLeft: 5 }]}>{data?.messenger.id}</Text>
                </Layout>
            </Layout>

            <TouchableOpacity
                style={styles.blockButton}
                onPress={() => onPressBlock()}
            >
                {(blockable)? <Unblock /> : <Block />}
            </TouchableOpacity>

        </Modal>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth * 0.9,
        padding: windowWidth * 0.05,
        paddingBottom: windowHeight * 0.05,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'
    },
    BackDrop: {
        backgroundColor: '#0008'
    },
    ButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    },
    ReportButton: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#a2a2a2',
        paddingVertical: 5,
        paddingHorizontal: windowWidth * 0.04
    },
    ReportButtonText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 12,
        color: '#a2a2a2'
    },
    ImageContainer: {
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
        borderRadius: 50
    },
    InfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: windowHeight * 0.006,
        justifyContent: 'space-between',
        width: '85%'
    },
    KeyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth*0.035,
        color: '#aeaeae',
        flex: 1.1,
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: windowWidth*0.035,
        flex: 2.5,
    },
    snsContainer: {
        flexDirection: 'row',
        flex: 2.5,
        alignItems: 'center',
    },
    NameText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20,
        marginTop: windowHeight * 0.01,
        marginBottom: windowHeight * 0.02
    },
    CloseButton: {
        width: windowWidth * 0.05,
        height: windowWidth * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blockButton: {
        marginTop: 15,
    }
})