import * as React from 'react';
import * as eva from '@eva-design/eva';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './model';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AppNavigator } from './navigation/App.navigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {  
  // Redux Store 파일
  const store = createStore(rootReducer);
  
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light}} >
          <NavigationContainer>
            <AppNavigator key={'APP'} type={React.Component} props={undefined} />
          </NavigationContainer>
        </ApplicationProvider>
    </Provider>
  );
}