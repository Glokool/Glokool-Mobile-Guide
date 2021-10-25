const CHAT_MODAL_VISIBILITY_TRUE = 'model/chat/set_modal_visibility/true';
const CHAT_MODAL_VISIBILITY_FALSE = 'model/chat/set_modal_visibility/false';

export const setChatModalVisiblityTrue = () => ({
    type: CHAT_MODAL_VISIBILITY_TRUE
})

export const setChatModalVisiblityFalse = () => ({
    type: CHAT_MODAL_VISIBILITY_FALSE
})

type ChatUIAction =
    | ReturnType<typeof setChatModalVisiblityTrue>
    | ReturnType<typeof setChatModalVisiblityFalse>

type ChatUIState = {
    ChatModalVisibility: boolean;
}

const InitialChatUIState = {
    ChatModalVisibility: false,
}

function ChatUIModel(
    state: ChatUIState = InitialChatUIState,
    action: ChatUIAction,
): ChatUIState {
    switch (action.type) {
        case CHAT_MODAL_VISIBILITY_TRUE:
            return {
                ChatModalVisibility: true,
            }
        case CHAT_MODAL_VISIBILITY_FALSE:
            return {
                ChatModalVisibility: false,
            }
        default: return state
    }
}

export default ChatUIModel;