import React, { useState, useEffect } from 'react';
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import { Layout } from '@ui-kitten/components'
import { windowWidth, windowHeight } from '../../Design.component';
import { ArrowLeft } from '../../assets/icon/Common';
import { ProfileDetailSceneProps } from '../../navigation/SceneNavigator/Profile.navigator';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { GuideInfoType } from './type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../model';
import { loading_start, loading_end } from '../../model/auth/auth.model';
import { SERVER } from '../../server';
import FastImage from 'react-native-fast-image';
import { AngleRight } from '../../assets/icon/Common';
import { LoadingComponent } from '../../component/Common';

export const ProfileDetailScene = (props: ProfileDetailSceneProps) => {

    const [guideInfo, setGuideInfo] = useState<GuideInfoType>();

    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");

    const [wrongPW, setWrongPW] = useState(false);
    const [wrongNewPW, setWrongNewPW] = useState(false);
    const [wrongAgain, setWrongAgain] = useState(false);

    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.AuthLoadingModel.loading);

    const keyword = ['k-pop lover', 'hiddenspots']

    const UID = auth().currentUser?.uid;

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

    const PasswordChange = async () => {

        auth().signInWithEmailAndPassword(auth().currentUser?.email!, password!)
            .then(() => {
                setWrongPW(false);
                if (newPassword.length >= 8 && newPassword === checkPassword) {
                    auth().currentUser?.updatePassword(newPassword).then(() => Alert.alert("비밀번호 변경이 완료되었습니다."));
                }
            })
            .catch((e) => {
                setWrongPW(true);
                return;
            })

        if (newPassword.length < 8) {
            setWrongNewPW(true);
            return;
        } else {
            setWrongNewPW(false);
        }

        if (newPassword != checkPassword) {
            setWrongAgain(true);
        } else {
            setWrongAgain(false);
        }

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

    return loading ? (
        <LoadingComponent />
    ) : (
        <Layout style={styles.MainContainer}>
            <Layout style={styles.TopTabContainer}>
                <TouchableOpacity style={styles.SideContainer} onPress={() => props.navigation.pop()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <Text style={styles.TopTabBarText}>프로필 관리</Text>
                <Layout style={styles.SideContainer} />
            </Layout>

            <ScrollView style={styles.ScrollViewStyle}>
                <Layout style={styles.ProfileCard}>
                    <Layout style={styles.ProfileContainer}>
                        <FastImage
                            source={{ uri: guideInfo?.avatar }}
                            style={styles.Image}
                            resizeMode='contain'
                        />
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
                </Layout>

                <Text style={[styles.GlokoolEmail, { color: '#595959' }]}>프로필 내용 수정을 희망할 시 아래 이메일로 연락 주세요</Text>
                <Text style={[styles.GlokoolEmail, { color: '#6464CC' }]}>sungsoo@glokool.com</Text>

                <Layout style={styles.PasswordContainer}>
                    <Text style={styles.PasswordText}>비밀번호 변경</Text>
                    <TextInput
                        style={[styles.TextInputStyle, { borderColor: wrongPW ? '#f77777' : '#d1d1d1' }]}
                        placeholder={'현재 비밀번호를 입력해주세요'}
                        onChangeText={(e) => setPassword(e)}
                        secureTextEntry
                    />
                    <Layout style={styles.WarningContainer}>
                        {wrongPW && <Text style={styles.WarningText}> 잘못된 비밀번호 입니다</Text>}
                    </Layout>
                    <TextInput
                        style={[styles.TextInputStyle, { borderColor: wrongNewPW ? '#f77777' : '#d1d1d1' }]}
                        placeholder={'새 비밀번호를 입력해주세요 (8자 이상)'}
                        onChangeText={(e) => setNewPassword(e)}
                        secureTextEntry
                    />
                    <Layout style={styles.WarningContainer}>
                        {wrongNewPW && <Text style={styles.WarningText}> 8자 이상 입력하셔야 합니다</Text>}
                    </Layout>
                    <TextInput
                        style={[styles.TextInputStyle, { borderColor: wrongAgain ? '#f77777' : '#d1d1d1' }]}
                        placeholder={'새 비밀번호를 한번 더 입력해주세요'}
                        onChangeText={(e) => setCheckPassword(e)}
                        secureTextEntry
                    />
                    <Layout style={styles.WarningContainer}>
                        {wrongAgain && <Text style={styles.WarningText}> 비밀번호가 일치하지 않습니다</Text>}
                    </Layout>

                    <TouchableOpacity style={styles.PasswordButton} onPress={() => PasswordChange()}>
                        <Text style={styles.PasswordButtonText}>비밀번호 변경</Text>
                    </TouchableOpacity>

                </Layout>

                <TouchableOpacity style={styles.FlatButton} onPress={() => { }}>
                    <Text style={styles.FlatButtonText}>{'탈퇴하기'}</Text>
                    <AngleRight />
                </TouchableOpacity>

            </ScrollView>

        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
        alignItems: 'center',
    },
    ScrollViewStyle: {
        width: windowWidth,
    },
    TopTabBarText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
    },
    TopTabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        paddingHorizontal: windowWidth * 0.05,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    SideContainer: {
        width: windowWidth * 0.07,
        height: windowWidth * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    GlokoolEmail: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        alignSelf: 'center',
    },
    TextInputStyle: {
        borderWidth: 1.5,
        borderRadius: 10,
        paddingVertical: windowHeight * 0.02,
        paddingHorizontal: windowHeight * 0.02,
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
    },
    PasswordButton: {
        width: windowWidth * 0.9,
        backgroundColor: '#7777ff',
        borderRadius: 8,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: windowHeight * 0.01
    },
    PasswordButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: 'white'
    },
    PasswordContainer: {
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowHeight * 0.03,
        marginTop: windowHeight * 0.02
    },
    PasswordText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        marginBottom: 10,
    },
    FlatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: windowWidth * 0.05,
        marginTop: 10,
        backgroundColor: 'white'
    },
    FlatButtonText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 18
    },
    WarningContainer: {
        backgroundColor: '#0000',
        height: 20,
        justifyContent: 'center',
    },
    WarningText: {
        color: '#f77777',
        fontFamily: 'Pretendard-Regular',
        fontSize: 13,
    }
})