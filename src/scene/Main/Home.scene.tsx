
import React from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet } from 'react-native';

import { Button, Layout, Text } from '@ui-kitten/components';
import { HomeSceneProps } from '../../navigation/Main.navigator';
import { ChatComponent } from '../../component/Chat/ChatRoom/Chat.component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SceneRoute, NavigatorRoute } from '../../navigation/App.route';



export const HomeScene = (props: HomeSceneProps): React.ReactElement => {

    return (
        <Layout style={styles.MainContainer}>
            {/* <ChatComponent /> */}
            <SafeAreaView />
            <Button onPress={() => { auth().signOut() }}>
                로그아웃
            </Button>

            <Button onPress={()=>{props.navigation.navigate(NavigatorRoute.PROFILE)}}>
                프로필
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        justifyContent:'space-evenly'
    }
})