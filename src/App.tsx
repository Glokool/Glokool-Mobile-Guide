import * as React from 'react';
import * as eva from '@eva-design/eva';
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

        });

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
    "EventEmitter.removeListener('change', ...)"
]);