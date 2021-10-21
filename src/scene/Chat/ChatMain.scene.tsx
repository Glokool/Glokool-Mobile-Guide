import React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ChatMainSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatMainBanner } from '../../assets/icon/Chat';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { windowHeight } from '../../Design.component';
import { ChatListComponent } from '../../component/Chat';

export const ChatMainScene = (props: ChatMainSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            <ChatMainBanner />
            <Text>진행중인 투어</Text>

            <ChatListComponent />
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        paddingTop: isIphoneX() ? getStatusBarHeight() + windowHeight * 0.01 : 0,
    }
})