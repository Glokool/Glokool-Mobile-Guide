import React from "react";
import { Layout } from '@ui-kitten/components'
import { StyleSheet } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import { ChatAudioComponent } from "./Audio.component";


type ChatAudioMessage = {
    currentMessage : {
        audio : string
    }
}

export const renderSound = (message : IMessage & ChatAudioMessage) : React.ReactElement => {

    return (
        <Layout style={styles.AudioMessageContainer}>            
            <ChatAudioComponent message={message} />
        </Layout>
    );
};

const styles = StyleSheet.create({
    AudioMessageContainer: {
        backgroundColor: '#00FF0000'
    }
})