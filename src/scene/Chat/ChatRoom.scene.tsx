import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ChatRoomSceneProps } from '../../navigation/SceneNavigator/Chat/Chat.navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatComponent } from '../../component/Chat';
import { useDispatch } from 'react-redux';
import { setMenuVisiblityFalse } from '../../model/chat/Chat.UI.model';
import { setEmojiKeyboardFalse } from '../../model/chat/Chat.Keyboard.model';


export const ChatRoomScene = (props: ChatRoomSceneProps): React.ReactElement => {
    const dispatch = useDispatch();

    // 채팅방 unmount 시 actions, emoji 키보드 제거
    useEffect(() => {
        return () => {
            dispatch(setMenuVisiblityFalse());
            dispatch(setEmojiKeyboardFalse());
        };
    }, [])

    return (
        <SafeAreaView style={styles.Container}>
            <ChatComponent {...props} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    Container: {
        flex: 1
    }

})