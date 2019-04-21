import axios        from 'axios';

import { 
    FETCH_CITIES_SUCCESS,
    FETCH_CITIES_FAILURE
} from './types';

export const fetchCities = provinceId => async dispatch => {

    if (localStorage.getItem(`cities${provinceId}`))
    {
        console.log('Get localstorage cities');

        dispatch({
            type: FETCH_CITIES_SUCCESS,
            payload: { cities: JSON.parse(localStorage.getItem(`cities${provinceId}`)).data }
        });
        
        return;
    }

    if (provinceId)
    {
        try {
            // GET THE CITIES
            const response = await axios.get(`https://ezanvakti.herokuapp.com/ilceler?sehir=${provinceId}`);
            if (response.status === 200)
            {
                console.log('Request to API for Cities'); 
                
                localStorage.setItem(`cities${provinceId}`, JSON.stringify({ data: response.data }));
                
                dispatch({
                    type: FETCH_CITIES_SUCCESS,
                    payload: { cities: response.data }
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
                type: FETCH_CITIES_FAILURE,
                error: (error.response) ? error.response : error
            });
        }
    }
};