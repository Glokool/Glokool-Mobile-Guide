/* 
    로그인 정보를 관리하기 위한 Redux 모듈 (이메일 및 비밀번호)
    Formik 모듈과 연동하여 이메일 여부 및 8자 이상의 비밀번호인지 판단
*/
const LOADING_START = 'model/AUTH/LOADING_START' as const;
const LOADING_END = 'model/AUTH/LOADING_END' as const;

const CHECK_GUIDE_TRUE = 'model/check_guide_true' as const;
const CHECK_GUIDE_FALSE = 'model/check_guide_false' as const;

export const loading_start = () => ({
    type: LOADING_START
});

export const loading_end = () => ({
    type: LOADING_END
});

export const checkGuideTrue = () => ({
    type: CHECK_GUIDE_TRUE
})

export const checkGuideFalse = () => ({
    type: CHECK_GUIDE_FALSE
})

type AuthUIAction =
    | ReturnType<typeof loading_start>
    | ReturnType<typeof loading_end>
    | ReturnType<typeof checkGuideTrue>
    | ReturnType<typeof checkGuideFalse>

type AuthUIState = {
    loading: boolean;
    checkGuide: boolean;
}

const intialState: AuthUIState = {
    loading: false,
    checkGuide: false,
}

function AuthUIModel(
    state: AuthUIState = intialState,
    action: AuthUIAction
): AuthUIState {

    switch (action.type) {
        case LOADING_START:
            return {
                loading: true,
                checkGuide: state.checkGuide
            };
        case LOADING_END:
            return {
                loading: false,
                checkGuide: state.checkGuide
            };
        case CHECK_GUIDE_TRUE:
            return {
                loading: state.loading,
                checkGuide: true,
            };
        case CHECK_GUIDE_FALSE:
            return {
                loading: state.loading,
                checkGuide: false,
            };
        default:
            return state
    }
}

export default AuthUIModel;




