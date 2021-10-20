import React from 'react';
import FastImage from 'react-native-fast-image';
import { StyleSheet, Pressable } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { IMessage, MessageImage, MessageImageProps } from 'react-native-gifted-chat'

const ChatImage = ({ props }) : React.ReactElement => {
    
    return (
        <Pressable>
            <FastImage
                source={{ uri: props }}
                resizeMode={FastImage.resizeMode.cover}
                style={{
                    width: 150,
                    height: 100,
                    borderRadius: 10,
                    margin: 3,
                }}
            />
        </Pressable>
    );
}


export const ChatImageMessageComponent = ( props : MessageImage<IMessage>['props'] ) : React.ReactElement => {

    const imageURL = props.currentMessage?.image;

    if (typeof imageURL === 'string') {
        return <ChatImage key={0} props={imageURL} />;
    } 
    else {
        return (
            <>
                {imageURL.map((url: string, index: number) => (
                    <ChatImage key={index} props={url} />
                ))}
            </>
        );
    }    

}


const styles = StyleSheet.create({

})

