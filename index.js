/**
 최초 앱 구동 파일
 src/app 파일부터 구동 시작
**/

import {AppRegistry} from 'react-native';
import App from './src/App'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
