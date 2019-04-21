import { combineReducers } from 'redux';
import prayerTimesReducer  from './prayerTimesReducer';
import countriesReducer    from './countriesReducer';
import provincesReducer    from './provincesReducer';
import citiesReducer       from './citiesReducer';

export default combineReducers({
    prayerTimes: prayerTimesReducer,
    countries: countriesReducer,
    provinces: provincesReducer,
    cities: citiesReducer
});