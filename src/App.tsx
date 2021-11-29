import * as React from 'react';
import * as eva from '@eva-design/eva';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './model';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/App.navigator';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { AuthContext } from './context';
import messaging from '@react-native-firebase/messaging';
import { authContextType } from './context/AuthContext';
import { StatusBar, LogBox } from 'react-native';
import { SERVER } from './server';
import axios from 'axios';


// 백그라운드 메시지 리스너
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});


export default function App() {

    // Redux Store 파일
    const store = createStore(rootReducer);

    // Firebase 상태 관리
    const [currentUser, setCurrentUser] = React.useState<authContextType | any>(null);
    const userValue = { currentUser, setCurrentUser };

    React.useEffect(() => {
        // 포어그라운드 메시지 리스너
        const unsubscribe = messaging().onMessage(async (remoteMessage) => {

            AsyncStorage.setItem('ChatCheck', 'true');
            AsyncStorage.setItem(`ChatCheck_${remoteMessage.data?.roomId}`, remoteMessage.data?.time);

        });

        if (auth().currentUser != undefined) {

            const TokenReceive = messaging().getToken()
                .then(async(result) => {
                    console.log('등록 토큰 리프레시 성공 : ', result);

                    const token = await auth().currentUser?.getIdToken();

                    const url = SERVER + '/guides/token';
                    const data = JSON.stringify({
                        uid : auth().currentUser?.uid,
                        token : result
                    })
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    }

                    axios.post(url, data, config)
                        .then((response) => {
                            console.log('서버 메시징 토큰 등록 성공');
                            console.log(response.data);
                        })
                        .catch((err) => {
                            console.error('서버 메시징 토큰 등록 오류 : ', err)
                        })                    

                })
                .catch((err) => {
                    console.log('등록 토큰 리프레시 실패 : ', err)
                })
        }

        



        setTimeout(() => {
            SplashScreen.hide();
        }, 2000)

        // 앱 종료시 실행 함수
        return () => {
            unsubscribe;
        }
    }, [])


    return (
        <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <StatusBar barStyle="dark-content" />
            <ApplicationProvider {...eva} theme={{ ...eva.light }} >
                <AuthContext.Provider value={userValue}>
                    <NavigationContainer>
                        <AppNavigator key={'APP'} type={React.Component} props={undefined} />
                    </NavigationContainer>
                </AuthContext.Provider>
            </ApplicationProvider>

        </Provider>
    );
}

LogBox.ignoreLogs([
    "EventEmitter.removeListener('change', ...)",
    "Module",
    "Can't"
]);