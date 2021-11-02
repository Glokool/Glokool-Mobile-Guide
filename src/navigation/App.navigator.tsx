import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorRoute, SceneRoute } from "./App.route";
import { AuthNavigator } from './Auth.navigator';
import { MainNavigator } from './Main.navigator';
import { RegisterNavigator } from './SceneNavigator/Tour/Tour.Register.Navigator';
import { ChatNavigator } from './SceneNavigator/Chat/Chat.navigator';
import { ProfileDetailScene } from '../scene/Profile';
import { AuthContext } from '../context';

export type AppNavigatorParams = {
    [NavigatorRoute.AUTH]: undefined;
    [NavigatorRoute.MAIN]: undefined;
    [NavigatorRoute.REGISTER]: undefined;
    [NavigatorRoute.CHAT]: {
        screen : SceneRoute;
        params : { id : string }
    };
}

const Stack = createStackNavigator();

export const AppNavigator = (props: React.ReactElement): React.ReactElement => {

    const { currentUser, setCurrentUser } = React.useContext(AuthContext);

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



