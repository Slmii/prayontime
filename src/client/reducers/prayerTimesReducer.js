import { 
    FETCH_PRAYER_TIMES_SUCCESS,
    FETCH_PRAYER_TIMES_FAILURE
} from '../actions/types';

const initialState = {
    data: null,
    error: null,
    isLoading: true,
    isError: false
};

const prayerTimesReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FETCH_PRAYER_TIMES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            };
        case FETCH_PRAYER_TIMES_FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                isError: true
            };
        default:
            return state;
    }
};

export default prayerTimesReducer;