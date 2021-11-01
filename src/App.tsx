import * as React from 'react';
import * as eva from '@eva-design/eva';
import auth from '@react-native-firebase/auth';
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
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
  const [currentUser, setCurrentUser] = React.useState<authContextType | null>(null);
  const userValue = { currentUser, setCurrentUser };

  React.useEffect(() => {
    auth().onAuthStateChanged(async(user) => {

          const userToken = await user?.getIdToken();

          const config = {
              method : 'GET',
              url : SERVER + '/guides/check',
              headers : {
                  Authorization: `Bearer ${userToken}`,
              }
          }

          if( userToken != undefined) {
              axios(config)
                  .then((response : any) => {

                      const userInfo = {
                          displayName: user?.displayName,
                          email: user?.email,
                          photoURL: user?.photoURL,
                          uid: user?.uid,
                          access_token: userToken,
                          gid : response.data._id
                      };

                      if (user?.providerData[0].providerId == "password" || user?.providerData[0].providerId == null) {
                          if (user && user?.emailVerified) { setCurrentUser(userInfo) }
                      } 
                      else {
                          if (user && user?.emailVerified) { setCurrentUser(userInfo) }
                      }
                  })
                  .catch((err) => {
                      console.log(err);
                      auth().signOut();
                  });
          }

    });


    // 포어그라운드 메시지 리스너
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {

    });


    setTimeout(() => {
      SplashScreen.hide();
    }, 500)


    // 앱 종료시 실행 함수
    return () => {
        unsubscribe;
    }




}, []);

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