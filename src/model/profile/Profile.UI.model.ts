
const LOADING_START = 'model/PROFILE/LOADING_START' as const;
const LOADING_END = 'model/PROFILE/LOADING_END' as const;

const LOADING_FAILED = 'model/profile_loading_failed' as const;
const LOADING_SUCCESS = 'model/profile_loading_success' as const;

export const profile_loading_start = () => ({
    type: LOADING_START
});

export const profile_loading_end = () => ({
    type: LOADING_END
});

export const profileLoadingSuccess = () => ({
    type: LOADING_SUCCESS
});

export const profileLoadingFailed = () => ({
    type: LOADING_FAILED
});

type ProfileUIAction =
    | ReturnType<typeof profile_loading_start>
    | ReturnType<typeof profile_loading_end>
    | ReturnType<typeof profileLoadingSuccess>
    | ReturnType<typeof profileLoadingFailed>

type ProfileUIState = {
    loading: boolean,
    loadingSuccess: boolean,
}

const intialState: ProfileUIState = {
    loading: false,
    loadingSuccess: true,
}

function ProfileUIModel(
    state: ProfileUIState = intialState,
    action: ProfileUIAction
): ProfileUIState {

    switch (action.type) {
        case LOADING_START:
            return {
                loading: true,
                loadingSuccess: state.loadingSuccess,
            };
        case LOADING_END:
            return {
                loading: false,
                loadingSuccess: state.loadingSuccess,
            };
        case LOADING_SUCCESS:
            return {
                loading: state.loading,
                loadingSuccess: true,
            };
        case LOADING_FAILED:
            return {
                loading: state.loading,
                loadingSuccess: false,
            };
        default:
            return state
    }
}

export default ProfileUIModel;




