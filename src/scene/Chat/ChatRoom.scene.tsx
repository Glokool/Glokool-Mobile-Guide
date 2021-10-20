import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { ChatRoomSceneProps } from '../../navigation/Chat.navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';


export const ChatRoomScene = (props : ChatRoomSceneProps) : React.ReactElement => {

    const [ChatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);

    return (
        <SafeAreaView style={{ flex : 1 }}>
            
            <GiftedChat
                messages={ChatMessages}
                textInputProps={{ autoFocus: true }}
                bottomOffset={(isIphoneX()) ? -getBottomSpace() + 47 : (Platform.OS === 'ios') ? - 25 : 0}
                onSend={(messages) => onSend(messages)}
                infiniteScroll={true}
                
                user={{
                    _id: currentUser?.uid,
                }}
                
                messagesContainerStyle={{
                    paddingBottom: Platform.OS === 'ios'? getBottomSpace() - 13 : 20,
                    paddingTop: isIphoneX() ? getStatusBarHeight() + 13 : 60
                }}
                alwaysShowSend={true}
                showUserAvatar={false}
                renderAvatarOnTop={true}
            />




        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    
})