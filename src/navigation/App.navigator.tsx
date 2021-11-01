import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from "./App.route";
import { AuthNavigator } from './Auth.navigator';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { MainNavigator } from './Main.navigator';
import { RegisterNavigator } from './SceneNavigator/Tour/Tour.Register.Navigator';
import { ChatNavigator } from './SceneNavigator/Chat/Chat.navigator';
import { ProfileDetailScene } from '../scene/Profile';

export type AppNavigatorParams = {
    [NavigatorRoute.AUTH]: undefined;
    [NavigatorRoute.MAIN]: undefined;
    [NavigatorRoute.REGISTER]: undefined;
    [NavigatorRoute.CHAT]: undefined;
}

const Stack = createStackNavigator();

export const AppNavigator = (props: React.ReactElement): React.ReactElement => {

    // Firebase 유저 관리 파일
    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>();

    function onAuthStateChanged(user : FirebaseAuthTypes.User | null) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

        
        return subscriber;
    }, []);

    return (
        <Stack.Navigator {...props} screenOptions={{ headerShown: false }}>
            {user ?
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



