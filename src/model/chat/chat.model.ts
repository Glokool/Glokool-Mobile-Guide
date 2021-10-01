/* 
    채팅 정보를 관리하기 위한 Redux 모듈
    빠른 렌더링을 위한 Input Component 값 관리
*/
const SET_TEXT = 'model/CHAT/SET_TEXT' as const;
const SET_INIT = 'model/CHAT/SET_INIT' as const;

export const set_text = (diff : string) => ({
    type : SET_TEXT,
    payload : diff
});

export const set_init = () => ({
    type : SET_INIT
})

type ChatInputAction = 
    | ReturnType<typeof set_text>
    | ReturnType<typeof set_init>;

type ChatInputState = {
    values : string;
}

const intialState : ChatInputState = {
    values : ''
}

function ChatInputModel(
    state : ChatInputState = intialState,
    action : ChatInputAction
) : ChatInputState {

    switch (action.type){
        case SET_TEXT : 
            return { values : action.payload };
        case SET_INIT : 
            return { values : '' };
        default : 
            return state
    }

}

export default ChatInputModel;