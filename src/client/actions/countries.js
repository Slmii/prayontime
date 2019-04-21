import axios        from 'axios';

import { 
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAILURE
} from './types';

export const fetchCountries = () => async dispatch => {

    if (localStorage.getItem('countries'))
    {
        console.log('Get localstorage Countries');

        dispatch({
            type: FETCH_COUNTRIES_SUCCESS,
            payload: { countries: JSON.parse(localStorage.getItem('countries')).data }
        });
        
        return;
    }

    try {
        // GET THE COUNTRIES
        const response = await axios.get('https://ezanvakti.herokuapp.com/ulkeler');
        if (response.status === 200)
        {
            console.log('Request to API Countries'); 
            
            localStorage.setItem('countries', JSON.stringify({ data: response.data }));
            
            dispatch({
                type: FETCH_COUNTRIES_SUCCESS,
                payload: { countries: response.data }
            });
        }
    } catch (error) {
        if (error.response) 
        {
            console.log('Response', error);
        } 
        else if (error.request) 
        {
            console.log('Request', error);
        } 
        else 
        {
            console.log('Rest', error);
        }

        dispatch({
            type: FETCH_COUNTRIES_FAILURE,
            error: (error.response) ? error.response : error
        });
    }
};