import React, { useState } from 'react';
import { StyleSheet, Platform, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { windowHeight, windowWidth } from '../../Design.component';
import { ArrowLeft } from '../../assets/icon/Common';
import { RegisterMainSceneProps } from '../../navigation/Register.Navigator';
import moment from 'moment';
import { SceneRoute } from '../../navigation/App.route';

export const RegisterMainScene = (props: RegisterMainSceneProps) => {

    const Today = new Date();
    const locationList = ['홍대', '광화문', '명동', '강남'];
    const travelerList = [1];

    const [dateIndex, setDateIndex] = useState(-1);
    const [locationIndex, setLocationIndex] = useState(-1);
    const [travelerIndex, setTravelerIndex] = useState(-1);

    const PressButton = () => {
        if (dateIndex > -1 && locationIndex > -1 && travelerIndex > -1) {

            const pickedDate = moment(Today).add(dateIndex, 'days').toString();
            const params = {
                location: locationList[locationIndex],
                traveler: travelerList[travelerIndex],
                date: pickedDate,
            }

            props.navigation.replace(SceneRoute.REGISTERSUCCESS, params);
        }
    }

    const renderDate = (item: { item: Date, index: number }) => {

        const isSelected = dateIndex === item.index;

        return (
            <Pressable
                style={[
                    styles.DateButton,
                    { borderColor: isSelected ? '#7777ff' : '#dbdbdb', }
                ]}
                onPress={() => setDateIndex(item.index)}
            >
                <Text style={[styles.ButtonValueText, { color: isSelected ? '#7777ff' : '#5c5c5c' }]}>
                    {moment(item.item).add(item.index, 'days').format('M월 D일')}
                </Text>
            </Pressable>
        )
    }

    const renderLocation = (item: { item: string, index: number }) => {

        const isSelected = locationIndex === item.index;

        return (
            <Pressable
                style={[
                    styles.GridButton,
                    { borderColor: isSelected ? '#7777ff' : '#dbdbdb', }
                ]}
                onPress={() => setLocationIndex(item.index)}
            >
                <Text style={[styles.ButtonValueText, { color: isSelected ? '#7777ff' : '#5c5c5c' }]}>{item.item}</Text>
            </Pressable>
        )
    }

    const renderTravelers = (item: { item: number, index: number }) => {

        const isSelected = travelerIndex === item.index;

        return (
            <Pressable
                style={[
                    styles.GridButton,
                    { borderColor: isSelected ? '#7777ff' : '#dbdbdb', }
                ]}
                onPress={() => setTravelerIndex(item.index)}>
                <Text style={[styles.ButtonValueText, { color: isSelected ? '#7777ff' : '#5c5c5c' }]}>{item.item} 명</Text>
            </Pressable>
        )
    }

    return (
        <Layout style={styles.MainContainer}>

            <Layout style={styles.TopTabContainer}>
                <TouchableOpacity style={styles.SideContainer} onPress={() => props.navigation.pop()}>
                    <ArrowLeft />
                </TouchableOpacity>
                <Text style={styles.TopTabBarText}>새 투어 등록하기</Text>
                <Layout style={styles.SideContainer} />
            </Layout>

            <Layout style={styles.InnerContainer}>

                <Layout style={{ backgroundColor: '#0000' }}>
                    <Layout style={styles.PropsContainer}>
                        <Text style={styles.TitleText}>날짜 선택</Text>
                        <FlatList
                            data={[Today, Today, Today]}
                            renderItem={renderDate}
                            horizontal
                            scrollEnabled={false}
                        />
                        <Layout style={styles.WarningContainer}>
                            {dateIndex == -1 && <Text style={styles.WarningText}>* 투어일을 선택해주세요</Text>}
                        </Layout>
                    </Layout>

                    <Layout style={styles.PropsContainer}>
                        <Text style={styles.TitleText}>지역 선택</Text>
                        <FlatList
                            data={locationList}
                            renderItem={renderLocation}
                            numColumns={2}
                            scrollEnabled={false}
                            key={"_"}
                            keyExtractor={(item, index) => "_" + index.toString()}
                        />
                        <Layout style={styles.WarningContainer}>
                            {locationIndex == -1 && <Text style={styles.WarningText}>* 투어지역을 선택해주세요</Text>}
                        </Layout>
                    </Layout>

                    <Layout style={styles.PropsContainer}>
                        <Text style={styles.TitleText}>투어 동시 진행 가능 인원 수 선택</Text>
                        <FlatList
                            data={travelerList}
                            renderItem={renderTravelers}
                            numColumns={2}
                            scrollEnabled={false}
                            key={"_"}
                            keyExtractor={(item, index) => "_" + index.toString()}
                        />
                        <Layout style={styles.WarningContainer}>
                            {travelerIndex == -1 && <Text style={styles.WarningText}>* 투어 인원 수를 선택해주세요</Text>}
                        </Layout>
                    </Layout>
                </Layout>

                <Layout style={styles.InfoContainer}>
                    <Text style={styles.InfoText}>등록하기를 누르면</Text>
                    <Text style={styles.InfoText}>이용약관 및 개인정보 처리방침 동의로 간주합니다.</Text>
                    <Text style={styles.InfoText}>{'자세한 내용은 문의사항 & FAQ 를 참고해주세요.'}</Text>

                    <TouchableOpacity style={styles.RegisterButton} onPress={() => PressButton()}>
                        <Text style={styles.RegisterButtonText}>등록하기</Text>
                    </TouchableOpacity>
                </Layout>


            </Layout>
        </Layout>
    )
}


const styles = StyleSheet.create({
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
    },
    SideContainer: {
        width: windowWidth * 0.07,
        height: windowWidth * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
    PropsContainer: {
        backgroundColor: '#0000',
        width: windowWidth * 0.9,
        alignSelf: 'center',
        marginVertical: 20,
    },
    MainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#f9f9f9',
    },
    TitleText: {
        fontFamily: 'Pretendard-SemiBold',
        fontSize: 16,
        color: '#8f8f8f',
        marginBottom: 15,
    },
    ButtonValueText: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
    },
    DateButton: {
        width: windowWidth * 0.28,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: windowHeight * 0.012,
        marginHorizontal: windowWidth * 0.01,
    },
    GridButton: {
        width: windowWidth * 0.43,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: windowHeight * 0.012,
        margin: windowWidth * 0.01,
    },
    InfoContainer: {
        backgroundColor: '#0000',
        alignItems: 'center',
        alignSelf: 'center',
        width: windowWidth * 0.9
    },
    InfoText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 14,
        color: '#8f8f8f'
    },
    RegisterButton: {
        width: windowWidth * 0.9,
        backgroundColor: '#7777ff',
        borderRadius: 8,
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        marginTop: windowHeight * 0.01
    },
    RegisterButtonText: {
        fontFamily: 'Pretendard-Medium',
        fontSize: 18,
        color: 'white'
    },
    InnerContainer: {
        backgroundColor: '#0000',
        height: windowHeight * 0.8,
        justifyContent: 'space-between'
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