import { 
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAILURE
} from '../actions/types';

const initialState = {
    data: null,
    error: null,
    isLoading: true,
    isError: false
};

const countriesReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FETCH_COUNTRIES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            };
        case FETCH_COUNTRIES_FAILURE:
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

export default countriesReducer;