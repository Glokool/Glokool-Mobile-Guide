import React from 'react';
import { StyleSheet } from 'react-native';
import { ProfileData } from '../../model/profile/profile.validation.model';;
import { Layout, Text, Button } from '@ui-kitten/components';
import { FormikProps } from 'formik';
import { FomikInputComponent } from '../Auth/SignIn/Formik.Input.component';

export const ProfileFormik = (props: FormikProps<ProfileData>): React.ReactFragment => {

    return (
        <>
            <Layout style={styles.ItemContainer}>
                <Text>Name</Text>
                <FomikInputComponent
                    id='email'
                    placeholder='E-mail'
                    keyboardType='email-address'
                />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Email</Text>
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Phone</Text>
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>oneLineIntro</Text>
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Intro</Text>
            </Layout>
        </>
    )
}

const styles = StyleSheet.create({
    ItemContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center'
    },
})