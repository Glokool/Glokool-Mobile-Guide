import React, { useState, useEffect } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native'
import { Button, Layout } from '@ui-kitten/components'
import { windowWidth, windowHeight } from '../../Design.component';
import { ImagePicker } from '../../assets/icon/Profile';
import FastImage from 'react-native-fast-image';
import { loading_start, loading_end } from '../../model/auth/auth.model';
import { GuideInfoType } from '../../scene/Profile/type';
import { SERVER, CDN } from '../../server';
import axios, { AxiosRequestConfig } from 'axios';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';


export const ProfileGuideInfo = () => {

    const [guideInfo, setGuideInfo] = useState<GuideInfoType>();
    const [profileImage, setProfileImage] = useState<string | any>(CDN + guideInfo?.avatar);
    const [imageChanged, setImageChanged] = useState(false);

    const UID = auth().currentUser?.uid;

    const dispatch = useDispatch();

    useEffect(() => {
        InitGuideInfo();
    }, []);

    const InitGuideInfo = () => {
        dispatch(loading_start());

        axios.get(`${SERVER}/api/guides/` + UID)
            .then((response) => {
                setGuideInfo(response.data);
                dispatch(loading_end());
            })
            .catch((e) => console.log(e));
    }

    const onPressImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: false,
            quality: 1,
            maxHeight: windowWidth * 0.2,
            maxWidth: windowWidth * 0.2,
        },
            (response: ImagePickerResponse) => {
                if (response.didCancel) {
                    return;
                } else {
                    setProfileImage(response.assets[0].uri);
                    setImageChanged(true);
                }
            }
        )
    }

    const onPressSaveButton = async () => {
        const authToken = await auth().currentUser?.getIdToken();

        const guidePatchData = {
            name: guideInfo?.name,
            birthDate: guideInfo?.birthDate,
            gender: guideInfo?.gender,
            lang: guideInfo?.lang,
            contact: guideInfo?.contact,
            oneLineIntro: guideInfo?.oneLineIntro,
            intro: guideInfo?.intro,
            country: guideInfo?.country,
            keyword: guideInfo?.keyword,
            avatar: Platform.OS === 'android' ? profileImage : profileImage.replace('file://', ''),
        }

        const config: AxiosRequestConfig = {
            method: "patch",
            url: `${SERVER}/api/guides/${guideInfo?.uid}`,
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
            data: JSON.stringify(guidePatchData),
        }

        axios(config)
            .then((response) => {
                Alert.alert("modified")
            }).catch((e) => console.log(e));
    }


    const renderKeyword = (item: { item: string, index: number }) => {
        return (
            <Layout style={styles.KeywordBox}>
                <Text style={styles.KeywordText}>
                    {item.item}
                </Text>
            </Layout>
        )
    }

    return (
        <Layout style={styles.ProfileCard}>
            <Layout style={styles.ProfileContainer}>
                <TouchableOpacity onPress={() => onPressImage()}>
                    <FastImage
                        source={{ uri: profileImage }}
                        style={styles.Image}
                        resizeMode='contain'
                    />
                    <ImagePicker style={styles.ImagePicker} />
                </TouchableOpacity>
                <Layout>
                    <Text style={styles.NameText}>{guideInfo?.name}</Text>
                    <Text style={styles.EmailText}>{guideInfo?.email}</Text>
                </Layout>
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text style={styles.KeyText}>Language</Text>
                <Text style={styles.ValueText}>English</Text>
            </Layout>

            <Layout style={styles.ItemContainer}>
                <Text style={styles.KeyText}>Nationality</Text>
                <Text style={styles.ValueText}>{guideInfo?.country}</Text>
            </Layout>

            <Text style={styles.OneLineIntro}>{guideInfo?.oneLineIntro}</Text>
            <Text style={styles.Intro}>{guideInfo?.intro}</Text>

            {guideInfo?.keyword && (
                <Layout style={styles.KeywordContainer}>
                    <FlatList
                        data={guideInfo?.keyword}
                        renderItem={renderKeyword}
                        horizontal
                        scrollEnabled={false}
                    />
                </Layout>
            )}
            <Button onPress={() => onPressSaveButton()}>테스트 저장</Button>
        </Layout>
    )
}


const styles = StyleSheet.create({
    ProfileCard: {
        width: windowWidth * 0.9,
        paddingHorizontal: windowWidth * 0.06,
        paddingVertical: windowHeight * 0.04,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 3.84,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        elevation: 2,
        borderRadius: 10,
        marginVertical: windowHeight * 0.02,
        alignSelf: 'center',
    },
    ProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: windowHeight * 0.01
    },
    Image: {
        width: windowWidth * 0.2,
        height: windowWidth * 0.2,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 100,
        marginRight: 20,
    },
    NameText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 20
    },
    EmailText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        marginTop: 10,
    },
    ItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    KeyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        color: '#c3c3c3',
        flex: 1
    },
    ValueText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 15,
        flex: 2
    },
    OneLineIntro: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
        color: '#7777ff',
        marginTop: windowHeight * 0.02
    },
    Intro: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        marginTop: windowHeight * 0.01
    },
    KeywordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    KeywordBox: {
        width: windowWidth * 0.36,
        marginHorizontal: windowWidth * 0.02,
        borderRadius: 50,
        paddingVertical: 8,
        backgroundColor: '#efefef',
        alignItems: 'center',
        justifyContent: 'center'
    },
    KeywordText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: Platform.OS === 'ios' ? 14 : 12,
    },
    ImagePicker: {
        position: 'absolute',
        bottom: 0,
        right: 20,
    }
})