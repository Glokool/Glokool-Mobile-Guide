const SET_KEYBOARD_TRUE = 'model/chat/set_keyboard_true' as const;
const SET_KEYBOARD_FALSE = 'model/chat/set_keyboard_false' as const;
const SET_KEYBOARD_HEIGHT = 'model/chat/set_keyboard_height' as const;
const CLEAN_KEYBOARD_HEIGHT = 'model/chat/clean_keyboard_height' as const;
const SET_EMOJI_KEYBOARD_TRUE = 'model/chat/set_emoji_keyboard_true' as const;
const SET_EMOJI_KEYBOARD_FALSE = 'model/chat/set_emoji_keyboard_false' as const;

export const setKeyboardTrue = () => ({
    type: SET_KEYBOARD_TRUE,
})

export const setKeyboardFalse = () => ({
    type: SET_KEYBOARD_FALSE
})

export const setKeyboardHeight = (diff: number) => ({
    type: SET_KEYBOARD_HEIGHT,
    payload: diff
})

export const cleanKeyboardHeight = () => ({
    type: CLEAN_KEYBOARD_HEIGHT
});

export const setEmojiKeyboardTrue = () => ({
    type : SET_EMOJI_KEYBOARD_TRUE
})

export const setEmojiKeyboardFalse = () => ({
    type : SET_EMOJI_KEYBOARD_FALSE
})

type ChatKeyboardAction =
    | ReturnType<typeof setKeyboardTrue>
    | ReturnType<typeof setKeyboardFalse>
    | ReturnType<typeof setKeyboardHeight>
    | ReturnType<typeof cleanKeyboardHeight>
    | ReturnType<typeof setEmojiKeyboardTrue>
    | ReturnType<typeof setEmojiKeyboardFalse>


type ChatKeyboardState = {
    keyboard: boolean;
    keyboardHeight: number;
    emojiKeyboardVisiblity : boolean;
}

const initialChatKeyboardState: ChatKeyboardState = {
    keyboard: false,
    keyboardHeight: 0,
    emojiKeyboardVisiblity : false
}

function ChatKeyboardModel(
    state: ChatKeyboardState = initialChatKeyboardState,
    action: ChatKeyboardAction
): ChatKeyboardState {

    switch (action.type) {

        case SET_KEYBOARD_TRUE: return { keyboard: true, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case SET_KEYBOARD_FALSE: return { keyboard: false, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case SET_KEYBOARD_HEIGHT: return { keyboard: state.keyboard, keyboardHeight: action.payload, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case CLEAN_KEYBOARD_HEIGHT: return { keyboard: state.keyboard, keyboardHeight: 0, emojiKeyboardVisiblity : state.emojiKeyboardVisiblity }
        case SET_EMOJI_KEYBOARD_FALSE: return { keyboard: state.keyboard, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : false } 
        case SET_EMOJI_KEYBOARD_TRUE: return { keyboard: state.keyboard, keyboardHeight: state.keyboardHeight, emojiKeyboardVisiblity : true } 
        
        default: return state
    }

}

export default ChatKeyboardModel