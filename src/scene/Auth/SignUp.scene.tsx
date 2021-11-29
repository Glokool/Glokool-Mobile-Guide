import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Platform, Pressable } from 'react-native'
import { Layout, CheckBox } from '@ui-kitten/components'
import { SignUpSceneProps } from '../../navigation/Auth.navigator';
import { ArrowLeft } from '../../assets/icon/Common';
import { windowHeight, windowWidth } from '../../Design.component';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { SceneRoute } from '../../navigation/App.route';
import axios, { AxiosRequestConfig } from 'axios';
import { SERVER } from '../../server';

export const SignUpScene = (props: SignUpSceneProps) => {

    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [education, setEducation] = useState("");
    const [language, setLanguage] = useState("");
    const [license, setLicense] = useState("");
    const [foreign, setForeign] = useState("");

    const [policy01, setPolicy01] = useState(false);
    const [policy02, setPolicy02] = useState(false);

    const enabled =
        name == "" ||
        birth == "" ||
        phone == "" ||
        email == "" ||
        education == "" ||
        language == "" ||
        license == "" ||
        foreign == "" ||
        !policy01 ||
        !policy02;

    const onPressButton = () => {
        const birthDate = birth.split('.');
        const date = new Date(Number(birthDate[0]), Number(birthDate[1]) - 1, Number(birthDate[2]) + 1);

        const data = {
            name: name,
            birthDate: date,
            phoneNumber: phone,
            email: email,
            education: education,
            lang: language,
            certification: license,
            career: foreign,
        }

        const config: AxiosRequestConfig = {
            method: 'post',
            url: SERVER + '/guide-application',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }

        axios(config)
            .then((response) => { props.navigation.replace(SceneRoute.SIGNUP_SUCCESS) })
            .catch((e) => { console.log(e.response.status) });
    }

    return (
        <Layout style={styles.MainContainer}>
            <Layout style={[styles.TopTabContainer, { flexDirection: 'row' }]}>
                <TouchableOpacity style={styles.SideContainer} onPress={() => props.navigation.pop()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <Text style={styles.TopTabBarText}>회원가입</Text>
                <Pressable
                    style={[styles.SideContainer, { backgroundColor: enabled ? "#ccc" : "#7777ff" }]}
                    onPress={() => onPressButton()}
                    disabled={enabled}
                >
                    <Text style={styles.ButtonText}>가입하기</Text>
                </Pressable>
            </Layout>

            <ScrollView>
                <Layout style={{ paddingHorizontal: windowWidth * 0.05, paddingBottom: windowHeight * 0.1 }}>
                    <Text style={styles.InfoText}>* 모든 항목은 필수입니다.</Text>

                    <Text style={styles.KeyText}>이름</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) 홍길동'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setName(e);
                        }}
                    />

                    <Text style={styles.KeyText}>생년월일</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) 2021.01.01'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setBirth(e);
                        }}
                    />

                    <Text style={styles.KeyText}>이메일</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) glokool@example.com'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setEmail(e);
                        }}
                    />

                    <Text style={styles.KeyText}>전화번호</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) 010-0000-0000'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setPhone(e);
                        }}
                    />

                    <Text style={styles.KeyText}>최종학력</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) 00대학교 00전공 0학년 재학 중'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setEducation(e);
                        }}
                    />

                    <Text style={styles.KeyText}>가이드 제공 언어</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) 영어, 중국어'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setLanguage(e);
                        }}
                    />

                    <Text style={styles.KeyText}>관련 자격증 및 보유점수</Text>
                    <TextInput
                        style={styles.TextInputStyle}
                        placeholder={'ex) OPCI AL, HSK 6급'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setLicense(e);
                        }}
                    />

                    <Text style={styles.KeyText}>해외 경력</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={5}
                        textAlignVertical='top'
                        style={[styles.TextAreaStyle, { marginBottom: 30 }]}
                        placeholder={'ex) 유학 5년, 해외거주 5년, 교환학생 5년'}
                        placeholderTextColor={'#ccc'}
                        onChangeText={(e) => {
                            setForeign(e);
                        }}
                    />
                    <Text style={styles.KeyText}>약관 동의</Text>
                    <Layout style={styles.PolicyContainer} >
                        <CheckBox checked={policy01} onChange={(check) => setPolicy01(check)} />
                        <Pressable onPress={() => props.navigation.navigate(SceneRoute.POLICY_01)}>
                            <Text style={styles.PolicyText}>이용약관 [필수]</Text>
                        </Pressable>
                    </Layout>

                    <Layout style={styles.PolicyContainer}>
                        <CheckBox checked={policy02} onChange={(check) => setPolicy02(check)} />
                        <Pressable onPress={() => props.navigation.navigate(SceneRoute.POLICY_02)}>
                            <Text style={styles.PolicyText}>개인정보 처리방침 [필수]</Text>
                        </Pressable>
                    </Layout>

                </Layout>
            </ScrollView>
        </Layout>
    )
}

const styles = StyleSheet.create({
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    TopTabBarText: {
        fontFamily: 'Pretendard-Bold',
        fontSize: 20,
    },
    TopTabContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: windowWidth,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        paddingBottom: 20,
        paddingHorizontal: windowWidth * 0.05
    },
    SideContainer: {
        width: windowWidth * 0.17,
        height: windowWidth * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    ButtonText: {
        fontFamily: 'Pretendard-Medium',
        color: 'white'
    },
    InfoText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 15,
        color: '#7b7b7b',
        marginVertical: windowHeight * 0.015
    },
    KeyText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#7777ff',
        marginBottom: windowHeight * 0.01,
    },
    TextInputStyle: {
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#e0e0e0',
        paddingVertical: windowHeight * 0.015,
        paddingHorizontal: windowHeight * 0.02,
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        marginBottom: windowHeight * 0.02,
    },
    TextAreaStyle: {
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#e0e0e0',
        paddingVertical: windowHeight * 0.015,
        paddingHorizontal: windowHeight * 0.02,
        fontFamily: 'Pretendard-Regular',
        fontSize: 15,
        height: windowHeight * 0.15,
    },
    PolicyText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 16,
        color: '#686868',
        marginLeft: 10,
    },
    PolicyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: windowHeight * 0.05,
    }
})