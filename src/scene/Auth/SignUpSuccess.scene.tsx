import React, {  } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { SignUpSceneProps } from '../../navigation/Auth.navigator';
import { windowWidth } from '../../Design.component';

export const SignUpSuccessScene = (props: SignUpSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            <Layout />

            <Layout>
                <Text style={styles.MainText}>{"Travel Assistant 에\n지원해주셔서 감사합니다 :)"}</Text>
                <Text style={styles.SubText}>빠른 시일 내에 담당자가 연락드리겠습니다.</Text>
            </Layout>

            <Pressable style={styles.ButtonContainer} onPress={() => props.navigation.pop()}>
            <Text style={styles.ButtonText}>확인했습니다</Text>
        </Pressable>
            
        </Layout >
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    MainText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 19,
        color: "#7777ff",
        textAlign: "center",
        lineHeight: 26,
    },
    SubText: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: 15,
        color: "#888",
        marginTop: 10,
        textAlign: "center",
    },
    ButtonContainer: {
        width: windowWidth * 0.9,
        height: 50,
        backgroundColor: "#7777ff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        marginBottom: 50,
    },
    ButtonText: {
        fontFamily: "Pretendard-SemiBold",
        fontSize: 18,
        color: "#fff",
    }
})