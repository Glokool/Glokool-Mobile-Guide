import { combineReducers } from 'redux'
import ChatInputModel from './chat/Chat.model';
import ChatUIModel from './chat/Chat.UI.model';
import AuthUIModel from './auth/Auth.UI.model';
import TourUIModel from './tour/Tour.UI.Model';
import ProfileUIModel from './profile/Profile.UI.model';
import ChatKeyboardModel from './chat/Chat.Keyboard.model';
import ChatLocationModel from './chat/Chat.Location.model';
import AudioDurationModel from './chat/Chat.Audio.model';


const rootReducer = combineReducers({
    ChatInputModel,
    ChatUIModel,
    ChatKeyboardModel,
    AuthUIModel,
    TourUIModel,
    ChatLocationModel,
    ProfileUIModel,
    AudioDurationModel
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>