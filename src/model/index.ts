import { combineReducers } from 'redux'
import ChatInputModel from './chat/chat.model';
import ChatUIModel from './chat/Chat.UI.model';
import AuthLoadingModel from './auth/auth.model';
import TourUIModel from './tour/Tour.UI.Model';
import ProfileUIModel from './profile/Profile.UI.model';

const rootReducer = combineReducers({
    ChatInputModel,
    ChatUIModel,
    AuthLoadingModel,
    TourUIModel,
    ProfileUIModel,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>