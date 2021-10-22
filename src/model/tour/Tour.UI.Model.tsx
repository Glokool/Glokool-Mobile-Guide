
const SET_TOUR_COMPLETE_VISIBILITY_TRUE = 'model/tour/set_tour_complete_visibility/true' as const;
const SET_TOUR_COMPLETE_VISIBILITY_FALSE = 'model/tour/set_tour_complete_visibility/false' as const;

const SET_TOUR_SCHEDULE_VISIBILITY_TRUE = 'model/tour/set_tour_schedule_visibility/true' as const;
const SET_TOUR_SCHEDULE_VISIBILITY_FALSE = 'model/tour/set_tour_schedule_visibility/false' as const;

export const setTourCompleteVisibilityTrue = () => ({
    type: SET_TOUR_COMPLETE_VISIBILITY_TRUE
})

export const setTourCompleteVisibilityFalse = () => ({
    type: SET_TOUR_COMPLETE_VISIBILITY_FALSE
})

export const setTourScheduleVisibilityTrue = () => ({
    type: SET_TOUR_SCHEDULE_VISIBILITY_TRUE
})

export const setTourScheduleVisibilityFalse = () => ({
    type: SET_TOUR_SCHEDULE_VISIBILITY_FALSE
})

type TourUIAction =
    | ReturnType<typeof setTourCompleteVisibilityTrue>
    | ReturnType<typeof setTourCompleteVisibilityFalse>
    | ReturnType<typeof setTourScheduleVisibilityTrue>
    | ReturnType<typeof setTourScheduleVisibilityFalse>

type TourUIState = {
    CompleteVisibility: boolean;
    ScheduleVisibility: boolean;
}

const InitialTourUIState = {
    CompleteVisibility: false,
    ScheduleVisibility: false,
}

function TourUIModel(
    state: TourUIState = InitialTourUIState,
    action: TourUIAction
): TourUIState {
    switch (action.type) {
        case SET_TOUR_COMPLETE_VISIBILITY_TRUE:
            return {
                CompleteVisibility: true,
                ScheduleVisibility: state.ScheduleVisibility,
            }
        case SET_TOUR_COMPLETE_VISIBILITY_FALSE:
            return {
                CompleteVisibility: false,
                ScheduleVisibility: state.ScheduleVisibility,
            }
        case SET_TOUR_SCHEDULE_VISIBILITY_TRUE:
            return {
                CompleteVisibility: state.CompleteVisibility,
                ScheduleVisibility: true,
            }
        case SET_TOUR_SCHEDULE_VISIBILITY_FALSE:
            return {
                CompleteVisibility: state.CompleteVisibility,
                ScheduleVisibility: false,
            }

        default: return state
    }
}

export default TourUIModel;