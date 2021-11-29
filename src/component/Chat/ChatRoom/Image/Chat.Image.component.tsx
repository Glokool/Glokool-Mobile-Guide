import { Layout } from '@ui-kitten/components';
import React, { Dispatch } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMessage, MessageImageProps } from 'react-native-gifted-chat';
import { setImageURL, setImageVisiblityTrue } from '../../../../model/chat/Chat.UI.model';


/* gifted chat 이미지 렌더링 */
export const renderImage = (props : Readonly<MessageImageProps<IMessage>> , dispatch : Dispatch<any>) => {

    const imageURL = props.currentMessage?.image;
    const imageZoom = (imageUrl : string ) : void => {
        dispatch(setImageVisiblityTrue());
        dispatch(setImageURL(imageUrl));
    }

    const ChatImage = ({ imgUrl } : any) : React.ReactElement => {
        return (
            <Pressable onPress={() => imageZoom(imgUrl)}>
                <FastImage
                    source={{ uri: imgUrl }}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.ChatImageContainer}
                />
            </Pressable>
        );
    };

    return (
        <ChatImage key={0} imgUrl={imageURL} />
    );

};

const styles = StyleSheet.create({

    ChatImageContainer: {
        width: 150,
        height: 100,
        borderRadius: 10,
        margin: 5,
    },

})
