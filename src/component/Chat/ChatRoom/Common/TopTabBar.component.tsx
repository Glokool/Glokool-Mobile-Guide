import React from 'react';
import { Keyboard, Platform, Pressable, StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { ArrowLeft } from '../../../../assets/icon/Common';
import { Chat_Setting } from '../../../../assets/icon/Chat/ChatRoom';
import { getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { ChatRoomSceneProps } from '../../../../navigation/SceneNavigator/Chat/Chat.navigator';
import { SceneRoute } from '../../../../navigation/App.route';

const statusBarHeight = getStatusBarHeight();

export const ChatTopTabBarComponent = (props : ChatRoomSceneProps) : React.ReactElement => {

    return(

        <Layout style={styles.TabBar}>

            <Layout style={styles.TabBarContainer} onTouchStart={Keyboard.dismiss}>      

                <Pressable
                    style={styles.LeftIcon}
                    onPress={() => {props.navigation.goBack()}}>
                    <ArrowLeft />
                </Pressable>

                <Layout style={styles.ProfileContainer}>
                    {/* <TouchableOpacity onPress={() => dispatch(setGuideVisiblityTrue())}>
                        <Image
                            source={require('../../../../assets/image/Chat/guideGray.png')}
                            style={styles.ProfileImage}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch(setGuideVisiblityTrue())}>
                        <Text style={styles.Title}>{guide.name}</Text>
                    </TouchableOpacity> */}

                    <Text style={styles.Title}>{props.route.params.zone.toUpperCase()}</Text>
                    
                </Layout>

                <Pressable
                    style={styles.RightIcon}
                    onPress={() => props.navigation.navigate(SceneRoute.CHAT_ROOM_INFO, { id : props.route.params.id })}
                >
                    <Chat_Setting />
                </Pressable>

            </Layout>            
        </Layout>
        
    )
}

const styles = StyleSheet.create({

    IconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },

    Title: {
        fontFamily: 'Pretendard-Medium',
        textAlign : 'center',
        fontSize: Platform.OS === 'ios' ? 18 : 16,
    },

    TabBar: {
        width: '100%',
        height: 60,
        justifyContent : 'center',
        backgroundColor: 'white',
        borderBottomWidth : 1,
        borderBottomColor : '#F0F0F0'
    },

    TabBarContainer : {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#00FF0000'
    },

    ProfileContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00FF0000'
    },

    ProfileImage: {        
        width: 25,
        height: 25,
        borderRadius: 100,
        marginRight: 15,
    },

    SmallIconContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        backgroundColor: '#00FF0000'
    },

    LeftIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: '#00FF0000'
    },

    RightIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    SmallIcon : {
        width: 10,
        height : 10,
        marginHorizontal: 5,
        padding : 15,
        justifyContent: 'center',
        alignItems: 'center'
    }

    
});

