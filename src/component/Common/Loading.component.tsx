import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../Design.component';

// 로딩 컴포넌트 
export const LoadingComponent = () => {
    return (
        <Layout style={styles.MainContainer}>
            <Spinner size='giant' />
        </Layout>
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        width: windowWidth,
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0006',
        position: 'absolute'
    }
})