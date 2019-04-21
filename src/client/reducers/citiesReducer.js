import { 
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_FAILURE
} from '../actions/types';

const initialState = {
    data: null,
    error: null,
    isLoading: true,
    isError: false
};

const citiesReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FETCH_CITIES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            };
        case FETCH_CITIES_FAILURE:
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

export default citiesReducer;