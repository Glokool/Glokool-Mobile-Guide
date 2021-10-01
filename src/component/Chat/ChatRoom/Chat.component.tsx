import React from 'react';
import database, { FirebaseDatabaseTypes } from '@react-native-firebase/database';
import { GiftedChat, IMessage } from 'react-native-gifted-chat'



export const ChatComponent = () : React.ReactElement => {

    const [messages, setMessages] = React.useState<Array<IMessage>>([]);
    const [db, setDb] = React.useState<FirebaseDatabaseTypes.Reference | undefined>(undefined);

    React.useEffect(() => {
        
        // 최초 채팅 DB 연결 
        const ChatDB = database().ref('/chats/' + '채팅방 ID');
        setDb(ChatDB);

        //Local UI용 채팅 Database 연결
        ChatDB.on('value', (snapshot) => {

            if (!snapshot.val()) {
                setMessages([]);
                return;
            }

            let { messages } = snapshot.val();

            if (!messages) {
                return;
            }

            messages = messages.map((node : ChatMessageType) => {
                const message : any = {};
                message._id = node._id;
                message.text = node.messageType === 'message' ? node.text : '';
                message.location = node.messageType === 'location' ? node.location : { lon : '', lat : '' };
                message.createdAt = node.createdAt;
                message.user = {
                    _id: node.user._id,
                };
                message.image = node.messageType === 'image' ? node.image : '';
                message.audio = node.messageType === 'audio' ? node.audio : '';
                message.messageType = node.messageType;

                return message;
            });

            setMessages([...messages]);
        });

        // 채팅방 종료시 실행
        return () => {
            
            if (db != undefined) db.off(); // RealTime Database 연결 종료
            setMessages([]);

        }

    }, [])

    const onSend = (message : any) : void => {
        // 메시지 전송 기능

        console.log(message);
        console.log(db);
    }

    return(
        <GiftedChat
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id : 1
            }}
        />
    )
}


