import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorRoute } from "./App.route";
import { AuthNavigator } from './Auth.navigator';
import auth from '@react-native-firebase/auth';
import { MainNavigator } from './Main.navigator';

export type AppNavigatorParams = {
    [NavigatorRoute.AUTH] : undefined;
    [NavigatorRoute.MAIN] : undefined;
}

const Stack = createStackNavigator();

export const AppNavigator = (props : React.ReactElement) : React.ReactElement => {

    // Firebase 유저 관리 파일
    const [initializing, setInitializing] = React.useState(true);
    const [user, setUser] = React.useState();
    
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    React.useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, []);

    return(
        <Stack.Navigator {...props} screenOptions={{ headerShown: false }}>
            {user?
                <Stack.Screen name={NavigatorRoute.MAIN} component={MainNavigator} />
                              
            : 
                <Stack.Screen name={NavigatorRoute.AUTH} component={AuthNavigator} />
            }
        </Stack.Navigator>
    )
}



