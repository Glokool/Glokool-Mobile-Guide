import React from 'react';
import { Dimensions, StyleSheet, Alert } from 'react-native';
import { ProfileData } from '../../model/profile/profile.validation.model';;
import { Layout, Text, Button } from '@ui-kitten/components';
import { FormikProps } from 'formik';
import { FomikInputComponent } from '../Auth/SignIn/Formik.Input.component';
import { ChangeInfo, GuideInfoType } from '../../scene/Profile/type';
import { SERVER } from '../../server';
import auth from '@react-native-firebase/auth';
import axios, { AxiosRequestConfig } from 'axios';

const windowWidth = Dimensions.get('window').width;

export const ProfileFormik = (props: FormikProps<GuideInfoType>): React.ReactFragment => {

    const initialValues = props.initialValues;

    // Save Profile 버튼 클릭 시 바뀐 가이드 정보를 서버에 dispatch
    const onPressSubmit = async (values: GuideInfoType) => {
        const authToken = await auth().currentUser?.getIdToken();

        const guidePatchData = {
            name: values.name,
            birthDate: values.birthDate,
            gender: values.gender,
            lang: values.lang,
            avatar: values.avatar,
            contact: values.contact,
            oneLineIntro: values.oneLineIntro,
            intro: values.intro,
            country: values.country,
            keyword: values.keyword,
        }

        const config: AxiosRequestConfig = {
            method: "patch",
            url: `${SERVER}/api/guides/${values.uid}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(guidePatchData),
        }
        
        axios(config)
            .then((response) => {
                console.log(response);
                Alert.alert("modified");
            })
            .catch((e) => console.log(e));
    }

    return (
        <>
            <Layout style={styles.ItemContainer}>
                <Text>Name</Text>
                <FomikInputComponent
                    id='name'
                    defaultValue={initialValues.name}
                />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Email</Text>
                <FomikInputComponent
                    id='email'
                    defaultValue={initialValues.email}
                    keyboardType='email-address'
                />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Contact</Text>
                <FomikInputComponent
                    id='contact'
                    defaultValue={initialValues.contact}
                    keyboardType='number-pad'
                />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>oneLineIntro</Text>
                <FomikInputComponent
                    id='oneLineIntro'
                    defaultValue={initialValues.oneLineIntro}
                />
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text>Intro</Text>
                <FomikInputComponent
                    id='intro'
                    defaultValue={initialValues.intro}
                />
            </Layout>

            <Button onPress={() => onPressSubmit(props.values)}>
                Save Profile
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    ItemContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth * 0.9,
    },
})