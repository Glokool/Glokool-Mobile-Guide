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
import { authContextType } from './context/AuthContext';

export default function App() {
  // Redux Store 파일
  const store = createStore(rootReducer);

  // Firebase 상태 관리
  const [currentUser, setCurrentUser] = React.useState<authContextType | null>(null);
  const userValue = { currentUser, setCurrentUser };

  React.useEffect(() => {
    auth().onAuthStateChanged((user) => {
        if (user?.providerData[0].providerId == "password" || user?.providerData[0].providerId == null) {
            if (user && user?.emailVerified) {
                const userInfo = {
                    displayName: user?.displayName,
                    email: user?.email,
                    photoURL: user?.photoURL,
                    uid: user?.uid,
                    access_token: null,
                };

                setCurrentUser(userInfo);
            } else {
                auth().signOut;
            }
        } else {
            const userInfo = {
                displayName: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL,
                uid: user?.uid,
                access_token: null,
            };

            setCurrentUser(userInfo);
        }
    });


    setTimeout(() => {
      SplashScreen.hide();
    }, 500)
}, []);

  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
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