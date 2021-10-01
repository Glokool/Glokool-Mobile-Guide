import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { ChatRoomSceneProps } from '../../navigation/Chat.navigator';
import { ChatComponent } from '../../component/Chat/ChatRoom/Chat.component';



export const ChatRoomScene = (props : ChatRoomSceneProps) : React.ReactElement => {

    return (
        <Layout>
            <ChatComponent />
        </Layout>
    )
}

const styles = StyleSheet.create({
    
})