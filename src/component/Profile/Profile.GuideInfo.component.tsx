import React, { useState, useEffect } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Button, Layout } from '@ui-kitten/components'
import { windowWidth, windowHeight } from '../../Design.component';
import { ImagePicker } from '../../assets/icon/Profile';
import FastImage from 'react-native-fast-image';
import { loading_start, loading_end } from '../../model/auth/auth.model';
import { GuideInfoType } from '../../scene/Profile/type';
import { SERVER, CDN } from '../../server';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { Asset, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';


export const ProfileGuideInfo = () => {

    const [guideInfo, setGuideInfo] = useState<GuideInfoType>();
    const [profileImage, setProfileImage] = useState<string | any>();
    const [photo, setPhoto] = useState<Asset | undefined>(undefined);
    const [imageChanged, setImageChanged] = useState(false);

    const UID: string | any = auth().currentUser?.uid;

    const dispatch = useDispatch();

    useEffect(() => {
        InitGuideInfo();
    }, []);

    // 가이드 정보 초기화 
    const InitGuideInfo = () => {
        dispatch(loading_start());

        axios.get(SERVER + '/api/guides/' + UID)
            .then((response) => {
                setGuideInfo(response.data);
                setProfileImage(CDN + response.data.avatar);
                dispatch(loading_end());
            })
            .catch((e) => console.log(e));
    }

    // 갤러리에서 이미지 선택 
    const onPressImage = () => {
        launchImageLibrary({
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
            maxHeight: windowWidth * 0.2,
            maxWidth: windowWidth * 0.2,
        },
            (response: ImagePickerResponse) => {
                if (response.didCancel) {
                    return;
                } else {
                    setPhoto(response.assets[0]);
                    setProfileImage(response.assets[0].uri);
                    setImageChanged(true);
                }
            }
        )
    }

    // 이미지 선택 후 저장버튼 클릭
    const onPressSaveButton = async () => {
        if (imageChanged) {
            const authToken = await auth().currentUser?.getIdToken();

            const data = new FormData();

            data.append('uid', UID);
            data.append("avatar", {
                name: photo?.fileName,
                type: photo?.type,
                uri: Platform.OS === 'android' ? 'file://' + photo?.uri : photo?.uri
            });

            axios.post(SERVER + '/api/guides/uploads', data, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    "Content-Type": "application/json",
                }
            }).then((response) => {
                Alert.alert(
                    "변경 완료",
                    "프로필 이미지 변경이 완료되었습니다.",
                    [{ text: "확인" }]
                )
            }).catch((e) => {
                Alert.alert(
                    "변경 실패",
                    "프로필 이미지 업로드에 실패하였습니다. 다시 시도해 주세요.",
                    [{ text: "확인" }]
                )
            })
        }
    }

    // 키워드 렌더링
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
                <Text style={styles.ValueText}>
                    {guideInfo?.lang && (guideInfo?.lang[0] && 'English ')}
                    {guideInfo?.lang && (guideInfo?.lang[1] && '中文')}
                </Text>
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