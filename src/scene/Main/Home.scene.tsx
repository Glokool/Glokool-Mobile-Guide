
import React from 'react';
import auth from '@react-native-firebase/auth'
import { StyleSheet } from 'react-native';
import { Button, Layout, Text } from '@ui-kitten/components';
import { HomeSceneProps } from '../../navigation/Main.navigator';



export const HomeScene = (props : HomeSceneProps) : React.ReactElement => {

    return (
        <Layout>
            <Text>안녕하세요 로그인 되었습니다</Text>
            <Button onPress={() => {auth().signOut()}}>
                로그아웃
            </Button>
        </Layout>
    )
}

const styles = StyleSheet.create({

})