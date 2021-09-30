import { combineReducers } from 'redux'
import ChatInputModel from './chat/chat.model';
import AuthLoadingModel from './auth/auth.model';

const rootReducer = combineReducers({
    ChatInputModel,
    AuthLoadingModel
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>