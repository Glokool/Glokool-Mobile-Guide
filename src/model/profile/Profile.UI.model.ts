
const LOADING_START = 'model/PROFILE/LOADING_START' as const;
const LOADING_END = 'model/PROFILE/LOADING_END' as const;

export const profile_loading_start = () => ({
    type : LOADING_START
});

export const profile_loading_end = () => ({
    type : LOADING_END
});

type ProfileUIAction = 
    | ReturnType<typeof profile_loading_start>
    | ReturnType<typeof profile_loading_end>;

type ProfileUIState = {   
    loading: boolean
}

const intialState : ProfileUIState = {
    loading: false
}

function ProfileUIModel(
    state : ProfileUIState = intialState,
    action : ProfileUIAction
) : ProfileUIState {

    switch (action.type){
        case LOADING_START : 
            return { loading : true };
        case LOADING_END : 
            return { loading : false };
        default : 
            return state
    }
}

export default ProfileUIModel;




