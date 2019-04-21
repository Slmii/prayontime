import axios from 'axios';

import { 
    FETCH_PROVINCES_SUCCESS,
    FETCH_PROVINCES_FAILURE
} from './types';

export const fetchProvinces = countryId => async dispatch => {

    if (localStorage.getItem(`provinces${countryId}`))
    {
        console.log('Get localstorage Provinces');

        dispatch({
            type: FETCH_PROVINCES_SUCCESS,
            payload: { provinces: JSON.parse(localStorage.getItem(`provinces${countryId}`)).data }
        });
        
        return;
    }

    if (countryId)
    {
        try {
            // GET THE PROVINCES
            const response = await axios.get(`https://ezanvakti.herokuapp.com/sehirler?ulke=${countryId}`);
            if (response.status === 200)
            {
                console.log('Request to API Provinces'); 
                
                localStorage.setItem(`provinces${countryId}`, JSON.stringify({ data: response.data }));
                
                dispatch({
                    type: FETCH_PROVINCES_SUCCESS,
                    payload: { provinces: response.data }
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
                type: FETCH_PROVINCES_FAILURE,
                error: (error.response) ? error.response : error
            });
        }
    }
};