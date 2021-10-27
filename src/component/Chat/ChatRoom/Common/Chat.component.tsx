import React from 'react';
import { Layout } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { renderCustomBubble, renderInputToolbar } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { Platform, StyleSheet } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Design.component';
import { renderSend } from './SendButton.component';
import { RootState } from '../../../../model';

export const ChatComponent = (props : any) : React.ReactElement => {

    const ChatRoomID = props.ChatRoomID;

    const [ChatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);

    const dispatch = useDispatch();
    const menuVisiblity = useSelector((state : RootState) => state.ChatUIModel.menuVisiblity);
    const emojiVisiblity = useSelector((state : RootState) => state.ChatKeyboardModel.emojiKeyboardVisiblity);


    React.useEffect(() => {

    }, [])
    


    return(
        <Layout style={styles.Container}>
            
            <GiftedChat
                messages={ChatMessages}
                textInputProps={{ autoFocus: true }}
                bottomOffset={(isIphoneX()) ? -getBottomSpace() + 47 : (Platform.OS === 'ios') ? - 25 : 0}
                // onSend={(messages) => onSend(messages)}
                infiniteScroll={true}

                // user={{
                //     _id: currentUser?.uid,
                // }}

                messagesContainerStyle={{
                    paddingBottom: Platform.OS === 'ios' ? getBottomSpace() - 13 : 20,
                    paddingTop: isIphoneX() ? getStatusBarHeight() + 13 : 60
                }}
                alwaysShowSend={true}
                showUserAvatar={false}
                renderAvatarOnTop={true}
                renderSend={renderSend}
                renderInputToolbar={(props) => renderInputToolbar(props, dispatch, menuVisiblity, emojiVisiblity)}
            />

        </Layout>
    )
}

const styles = StyleSheet.create({
    Container: {
        width : windowWidth,
        height : windowHeight
    }
})