import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';

export const LoadingComponent = () => {
    return (
        <Layout style={styles.MainContainer}>
            <Spinner size='giant' />
        </Layout>
    )
};

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0006',
        position: 'absolute'
    }
})