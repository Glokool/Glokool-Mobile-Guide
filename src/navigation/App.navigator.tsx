import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from "./App.route";
import { AuthNavigator } from './Auth.navigator';
import { MainNavigator } from './Main.navigator';
import { RegisterNavigator } from './SceneNavigator/Tour/Tour.Register.Navigator';
import { ChatNavigator } from './SceneNavigator/Chat/Chat.navigator';
import { ProfileDetailScene } from '../scene/Profile';
import { AuthContext } from '../context';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { SERVER } from '../server';
import { useDispatch } from 'react-redux';
import { checkGuideTrue, checkGuideFalse } from '../model/auth/Auth.UI.model';

export type AppNavigatorParams = {
    [NavigatorRoute.AUTH]: undefined;
    [NavigatorRoute.MAIN]: undefined;
    [NavigatorRoute.REGISTER]: undefined;
    [NavigatorRoute.CHAT]: {
        screen: SceneRoute;
        params: { id: string }
    };
}

const Stack = createStackNavigator();

export const AppNavigator = (props: React.ReactElement): React.ReactElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);
    const dispatch = useDispatch();

    React.useEffect(() => {
        auth().onAuthStateChanged(async (user) => {

            if (user != null || user != undefined) {
                const userToken = await user?.getIdToken();
                const url = SERVER + '/guides/check';
                const config = {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    }
                }

                axios.get(url, config)
                    .then((result: any) => {
                        const userInfo = {
                            displayName: user?.displayName,
                            email: user?.email,
                            photoURL: user?.photoURL,
                            uid: user?.uid,
                            access_token: userToken,
                            gid: result.data._id
                        };

                        if (user?.providerData[0].providerId == "password" || user?.providerData[0].providerId == null) {
                            if (user && user?.emailVerified) { setCurrentUser(userInfo) }
                        }
                        else {
                            if (user && user?.emailVerified) { setCurrentUser(userInfo) }
                        }
                    })
                    .catch((err) => {
                        dispatch(checkGuideTrue())
                        auth().signOut();
                    })
            }
        });
    }, [])

    return (
        <Stack.Navigator {...props} screenOptions={{ headerShown: false }}>
            {currentUser ?
                <>
                    {/* Bottom Tab 을 보여주고 싶은 화면은 Main navigator 하위로, 보여주고 싶지 않은 화면은 동일 경로로 설정 */}
                    <Stack.Screen name={NavigatorRoute.MAIN} component={MainNavigator} />
                    <Stack.Screen name={NavigatorRoute.REGISTER} component={RegisterNavigator} />
                    <Stack.Screen name={NavigatorRoute.CHAT} component={ChatNavigator} />
                    <Stack.Screen name={SceneRoute.PROFILE_DETAIL} component={ProfileDetailScene} />
                </>
                :
                <Stack.Screen name={NavigatorRoute.AUTH} component={AuthNavigator} />
            }
        </Stack.Navigator>
    )
}



