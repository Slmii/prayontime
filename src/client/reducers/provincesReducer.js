import { 
    FETCH_PROVINCES_SUCCESS,
    FETCH_PROVINCES_FAILURE
} from '../actions/types';

const initialState = {
    data: null,
    error: null,
    isLoading: true,
    isError: false
};

const provincesReducer = (state = initialState, action) => {
    switch(action.type)
    {
        case FETCH_PROVINCES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                isLoading: false,
                isError: false
            };
        case FETCH_PROVINCES_FAILURE:
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

export default provincesReducer;