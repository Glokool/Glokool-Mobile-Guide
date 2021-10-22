import React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ChatMainSceneProps } from '../../navigation/SceneNavigator/Chat.navigator';
import { ChatMainBanner } from '../../assets/icon/Chat';
import { isIphoneX, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { windowHeight, windowWidth } from '../../Design.component';
import { ChatListComponent, NewTourButton } from '../../component/Chat';
import { DailyTopNavigator } from '../../component/Daily/Daily.TopNavigator';

export const ChatMainScene = (props: ChatMainSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            <ChatMainBanner width={windowWidth} />
            <ChatListComponent {...props} />
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