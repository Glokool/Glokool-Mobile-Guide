import React from 'react';
import { StyleSheet } from 'react-native';
import { ChatRoomSceneProps } from '../../navigation/SceneNavigator/Chat/Chat.navigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatComponent } from '../../component/Chat';


export const ChatRoomScene = (props: ChatRoomSceneProps): React.ReactElement => {


    return (
        <SafeAreaView style={styles.Container}>

            <ChatComponent />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    Container : {
        flex : 1
    }

})