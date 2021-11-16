import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ChatMainSceneProps } from '../../navigation/SceneNavigator/Chat/Chat.navigator';
import { ChatMainBanner } from '../../assets/icon/Chat';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { windowHeight, windowWidth } from '../../Design.component';
import { ChatListComponent, NewTourButton } from '../../component/Chat';

// 글로챗 메인 화면 
export const ChatMainScene = (props: ChatMainSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            {/* 채팅 상단 배너 */}

            <ChatMainBanner width={windowWidth} height={windowWidth/414 * 149.3} onPress={() => Linking.openURL('https://spring-wok-92b.notion.site/4cc039f1d5f0452bbca9036578998faa')}/>
            {/* 채팅 리스트 */}
            <ChatListComponent {...props} />
            {/* 새로운 일정 등록 버튼 */}
            <NewTourButton {...props} />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        paddingTop: isIphoneX() ? getStatusBarHeight() + windowHeight * 0.01 : 0,
    },

})