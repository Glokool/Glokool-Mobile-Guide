import React, { useState } from 'react';
import { Dimensions, StyleSheet, Alert, TouchableOpacity, Platform } from 'react-native';
import { Layout, Text, Button } from '@ui-kitten/components';

import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import axios, { AxiosRequestConfig } from 'axios';
import FastImage from 'react-native-fast-image';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import { FormikProps } from 'formik';
import { FomikInputComponent } from '../Auth/SignIn/Formik.Input.component';

import { GuideInfoType } from '../../scene/Profile/type';
import { SERVER, CDN } from '../../server';

const windowWidth = Dimensions.get('window').width;

export const ProfileFormik = (props: FormikProps<GuideInfoType>): React.ReactFragment => {
    const initialValues = props.initialValues;

    const [photo, setPhoto] = useState();
    const [profileImage, setProfileImage] = useState<string | any>(CDN + initialValues.avatar);
    const [imageChanged, setImageChanged] = useState<boolean>(false);



    // Save Profile 버튼 클릭 시 바뀐 가이드 정보를 서버에 dispatch
    const onPressSubmit = async (values: GuideInfoType) => {
        const authToken = await auth().currentUser?.getIdToken();

        if (imageChanged) {
            uploadImage();
        }

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
                Alert.alert("modified");
            })
            .catch((e) => console.log(e));
    }

    const onPressImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
            maxHeight: 200,
            maxWidth: 200,
        },
            (response: ImagePickerResponse) => {
                if (response.didCancel) {
                    return;
                } else {

                    setPhoto(response.assets[0]);
                    setProfileImage(response.assets[0].uri);
                    setImageChanged(true);
                }
            })
    }

    const uploadImage = async () => {
        const authToken = await auth().currentUser?.getIdToken();

        const result = await fetch(profileImage);
        const blob = RNFetchBlob.fetch('GET', profileImage)
        const fileData = new File([blob], blob._data.name, { type: blob._data.type });
        console.log(blob);

        const config: AxiosRequestConfig = {
            method: "post",
            url: SERVER + "api/guides/uploads",
            data: fileData,
            headers: {
                Authorization: "Bearer " + authToken,
                "Content-Type": "application/json",
            },
        }

        axios(config)
            .then((response) => console.log(response.data))
            .catch((e) => console.log("Error", e));
    }

    return (
        <>
            <TouchableOpacity onPress={() => onPressImage()}>
                <FastImage
                    source={{ uri: profileImage }}
                    style={styles.ImageItem}
                />
            </TouchableOpacity>

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

            {initialValues.keyword?.map((item) => (
                <Text>{item}</Text>
            ))}

            <Text>{initialValues.birthDate}</Text>
            <Text>{initialValues.gender}</Text>
            <Text>{initialValues.country}</Text>

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
    ImageItem: {
        width: 150,
        height: 150,
        borderRadius: 100,
        borderWidth: 0.5,
    },
})