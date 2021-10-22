import React from 'react';
import { StyleSheet, Platform, Text, FlatList, TouchableOpacity } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { RegisterSuccessSceneProps } from '../../navigation/Register.Navigator';

export const RegisterSuccessScene = (props:RegisterSuccessSceneProps) => {
    return (
        <Layout style={styles.MainContainer}>
            
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9'
    }
})