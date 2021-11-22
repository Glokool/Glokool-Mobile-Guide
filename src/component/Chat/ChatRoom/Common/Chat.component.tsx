import React, { useState } from 'react';
import database from '@react-native-firebase/database';
import { Layout } from '@ui-kitten/components';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { EmojiKeyboardComponent, renderAvatar, renderBubble, renderCustomBubble, renderInputToolbar, renderLoadEarlier, renderTime } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { getBottomSpace, getStatusBarHeight, isIphoneX } from 'react-native-iphone-x-helper';
import { Alert, Keyboard, KeyboardEventListener, Platform, SafeAreaView, StyleSheet, } from 'react-native';
import { windowHeight, windowWidth } from '../../../../Design.component';
import { filterText } from '../../../../model/FilterChat';
import { RootState } from '../../../../model';
import { AuthContext } from '../../../../context';
import { ChatTopTabBarComponent } from './TopTabBar.component';
import { ChatRoomSceneProps } from '../../../../navigation/SceneNavigator/Chat/Chat.navigator';
import { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { renderImage } from '../Image/Chat.Image.component';
import { setKeyboardFalse, setKeyboardHeight, setKeyboardTrue } from '../../../../model/chat/Chat.Keyboard.model';
import { ImageModal } from '../Image/Chat.ImageModal.component';
import { renderSound } from '../Audio/Sound.component';
import { LocationModal } from '../Location/LocationModal.component';
import { ExtraKeyboardComponent } from './ExtraKeyboard.component';
import { AudioRecordComponent } from '../Audio/AudioRecord.component';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ChatComponent = (props: ChatRoomSceneProps): React.ReactElement => {

    // React 모듈 함수 (DB, 메시지 저장)
    const [ChatDB, setChatDB] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);
    const [ChatMessages, setChatMessages] = React.useState<Array<IMessage>>([]);
    const [messagesCount, setMessagesCount] = React.useState<number>(50);

    // Auth 관련 함수
    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

    // React-Redux 관련 함수 (UI 제어)
    const dispatch = useDispatch();
    const menuVisiblity = useSelector((state: RootState) => state.ChatUIModel.menuVisiblity);
    const emojiVisiblity = useSelector((state: RootState) => state.ChatKeyboardModel.emojiKeyboardVisiblity);
    const keyboardOpen = useSelector((state: RootState) => state.ChatKeyboardModel.keyboard);


    const [iphoneXKeyboardPadding, setIphoneXKeyboardPadding] = useState<number>(getBottomSpace() - 34);
    const [iosKeyboardPadding, setIosKeyboardPadding] = useState<number>(-14);

    React.useEffect(() => {

        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setIphoneXKeyboardPadding(getBottomSpace() - 34);
            setIosKeyboardPadding(-14);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setIphoneXKeyboardPadding(getBottomSpace() - 13);
            setIosKeyboardPadding(20);
        });
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // 최초 시동 함수
    React.useEffect(() => {

        AsyncStorage.setItem(`ChatCheck_${props.route.params.id}`, '');

        const KeyboardOpen = (e) => {
            dispatch(setKeyboardHeight(e.endCoordinates.height + 60));
            dispatch(setKeyboardTrue())
        }

        const KeyboardHide = (e) => {
            dispatch(setKeyboardFalse())
        }

        Keyboard.addListener('keyboardDidShow', KeyboardOpen);
        Keyboard.addListener('keyboardDidHide', KeyboardHide);

        const Chat = database().ref('/chats/' + props.route.params.travelDate + '/' + props.route.params.id + '/messages');
        setChatDB(Chat);

        var tempMessages: Array<IMessage> = [];

        Chat.orderByKey().limitToLast(1).on('child_added', (snapshot, previousKey) => {
            setChatMessages(value => GiftedChat.append(value, snapshot.val()));
        });

        Chat.orderByKey().limitToLast(messagesCount).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });

            setChatMessages(tempMessages);
        });



        return () => {

            if (ChatDB != undefined) { ChatDB.off('child_added') }
            Keyboard.removeAllListeners('keyboardDidShow');
            Keyboard.removeAllListeners('keyboardDidHide');

        };

    }, []);

    const onSend = (messages: IMessage[]): void => {

        if (filterText(messages[0].text)) {
            const newMessage = ChatDB?.push();
            let message = {
                _id: newMessage?.key,
                user: {
                    _id: currentUser?.uid,
                    name: currentUser?.displayName
                },
                messageType: 'message',
                createdAt: new Date().getTime(),
                location: '',
                image: '',
                audio: '',
                text: messages[0].text
            }

            newMessage?.set(message, (e) => {
                if (e != null) { console.log('채팅 전송 실패 : ', e) }
            });
        } else {
            Alert.alert("욕설이 감지되었습니다.");
        }
    }

    const LoadEarlierMessages = () => {

        ChatDB?.off('child_added'); // 먼저 기존 리스너 제거

        var tempMessages: Array<IMessage> = [];

        ChatDB?.orderByKey().limitToLast(1).on('child_added', (snapshot, previousKey) => {
            setChatMessages(value => GiftedChat.append(value, snapshot.val()));
        });


        ChatDB?.orderByKey().limitToLast(messagesCount + 50).once('value', (snapshot) => {
            snapshot.forEach((data) => {
                tempMessages = GiftedChat.append(tempMessages, data.val());
            });

            setChatMessages(tempMessages);
        });

        setMessagesCount(messagesCount + 50);

    }


    return (
        <SafeAreaView style={styles.Container}>

            <ChatTopTabBarComponent {...props} />

            <Layout style={styles.Container}>
                <GiftedChat
                    messages={ChatMessages}
                    textInputProps={{ autoFocus: true }}
                    bottomOffset={(isIphoneX()) ? -getBottomSpace() + 47 : (Platform.OS === 'ios') ? - 25 : 0}
                    onSend={(messages) => onSend(messages)}
                    infiniteScroll={true}
                    loadEarlier={true}
                    user={{ _id: currentUser?.uid }}
                    messagesContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? (isIphoneX() ? iphoneXKeyboardPadding : iosKeyboardPadding) : 20 }}
                    alwaysShowSend={true}
                    showUserAvatar={false}
                    renderAvatarOnTop={true}
                    renderLoadEarlier={renderLoadEarlier}
                    onLoadEarlier={() => { LoadEarlierMessages() }}
                    renderBubble={renderBubble}
                    renderAvatar={renderAvatar}
                    renderTime={renderTime}
                    renderMessageAudio={renderSound}
                    renderCustomView={(props) => renderCustomBubble(props, dispatch)}
                    renderMessageImage={(props) => renderImage(props, dispatch)}
                    renderInputToolbar={(props) => renderInputToolbar(props, dispatch, menuVisiblity, emojiVisiblity)}
                />
            </Layout>

            {/* 엑스트라 키보드 */}
            <ExtraKeyboardComponent ChatDB={ChatDB} ChatRoomID={props.route.params.id} travelDate={props.route.params.travelDate} />

            {/* 이모지 키보드 */}
            <EmojiKeyboardComponent ChatDB={ChatDB} ChatRoomID={props.route.params.id} />

            {/* 오디오 컴포넌트 */}
            <AudioRecordComponent ChatDB={ChatDB} ChatRoomID={props.route.params.id} travelDate={props.route.params.travelDate} />

            {/* 이미지 클릭시 확대 이미지 창 출력 */}
            <ImageModal />

            {/* 위치 메시지 클릭시 큰 화면 출력 */}
            <LocationModal />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
    },

})