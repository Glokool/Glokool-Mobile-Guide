import { combineReducers } from 'redux'
import ChatInputModel from './chat/chat.model';
import AuthLoadingModel from './auth/auth.model';
import TourUIModel from './tour/Tour.UI.Model';

const rootReducer = combineReducers({
    ChatInputModel,
    AuthLoadingModel,
    TourUIModel,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>