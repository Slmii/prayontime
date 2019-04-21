import React, { useState, useEffect } from 'react';
import { connect }                    from 'react-redux';

import { fetchCities }    from '../../actions/cities';
import { fetchProvinces } from '../../actions/provinces';

function CountryForm(props) {
    const [showProvinces, setShowProvinces] = useState(false);
    const [showCities, setShowCities]       = useState(false);
    const [cityNotEmpty, setCityNotEmpty]   = useState(false);
    const [cityId, setCityId]               = useState('');
    const [cityName, setCityName]           = useState('');

    const handleOnChangeCountry = e => {
        if (e.target.value !== '*')
        {
            props.fetchProvinces(e.target.value);

            // SHOW THE PROVINCES
            setShowProvinces(true);
        }
        else
        {
            // HIDE THE PROVINCES
            setShowProvinces(false);
        }

        // WHENEVER THE COUNRY IS GETTING CHANGES, WE ALWAYS WANT TO HIDE THE CITIES AND DISABLE THE BUTTON
        // THIS IS BECAUSE WHEN CHANING COUNTRY, A NEW CITY HAS TO BE CHOSEN
        setCityNotEmpty(false);
        setShowCities(false);
    };

    const handleOnChangeProvince = e => {
        if (e.target.value !== '*')
        {
            props.fetchCities(e.target.value);

            // SHOW THE CITIES
            setShowCities(true);
        }
        else
        {
            // HIDE THE CITIES
            setShowCities(false);

            // DISABLE THE BUTTON
            setCityNotEmpty(false);
        }
    };

    const handleOnChangeCity = e => {
        if (e.target.value !== '*') 
        {
            console.log('Previous City', localStorage.getItem('cityId'), localStorage.getItem('cityName'));
            console.log('New City ID', e.target.value);
            console.log('New City Name', e.target.options[e.target.selectedIndex].text);

            // FILL THE STATE
            setCityId(e.target.value);
            setCityName(e.target.options[e.target.selectedIndex].text);

            // ENABLE THE BUTTON
            setCityNotEmpty(true);
        }
        else
        {
            // EMPTY THE STATE
            setCityId('');
            setCityName('');

            // DISABLE THE BUTTON
            setCityNotEmpty(false);
        }
    };

    const handleOnButtonClick = () => {

        localStorage.setItem('cityId', cityId);
        localStorage.setItem('cityName', cityName);

        // localStorage.removeItem('cityId');
        // localStorage.removeItem('cityName');
        
        props.openForm();
    };

    const renderCountries = () => {
        const { dataCountries: { countries }, isErrorCountries, errorCountries } = props;
        return countries.map(({ UlkeID, UlkeAdiEn }, index) => <option key={index} value={UlkeID}>{UlkeAdiEn}</option>);
    };

    const renderProvinces = () => {
        const { dataProvinces: { provinces }, isErrorProvinces, errorProvinces } = props;
        return provinces.map(({ SehirID, SehirAdiEn }, index) => <option key={index} value={SehirID}>{SehirAdiEn}</option>);
    };

    const renderCities = () => {
        const { dataCities: { cities }, isErrorCities, errorCities } = props;
        return cities.map(({ IlceID, IlceAdiEn }, index) => <option key={index} value={IlceID}>{IlceAdiEn}</option>);
    };

    return (
        <React.Fragment>
            <div className="row justify-content-md-center mt100">
                <div className="col-md-7">
                    <div id="prayer-form">
                        <div id="prayer-form__country">
                        {
                            <select onChange={handleOnChangeCountry} className="custom-select">
                                <option defaultChecked value="*">--- SELECT COUNTRY ---</option>
                                {renderCountries()}
                            </select>
                        }
                        </div>
                        {
                            showProvinces && <div id="prayer-form__province" className="mt30">
                                                <select onChange={handleOnChangeProvince} className="custom-select">
                                                    <option defaultChecked value="*">--- SELECT COUNTRY/PROVINCE ---</option>
                                                    {renderProvinces()}
                                                </select>
                                            </div>
                        }
                        {
                            showCities && <div id="prayer-form__city" className="mt30">
                                                <select onChange={handleOnChangeCity} className="custom-select">
                                                    <option defaultChecked value="*">--- SELECT CITY ---</option>
                                                    {renderCities()}
                                                </select>
                                            </div>
                        }
                        <div className="buttons text-right mt30">
                            <button className="btn btn-danger rounded-0" type="button" onClick={props.openForm}>Back</button>&nbsp;
                            {
                                cityNotEmpty 
                                ? <button className="btn btn-main rounded-0" type="button"  onClick={handleOnButtonClick}>Load Prayer Times</button>
                                : <button className="btn btn-light disabled rounded-0" type="button" disabled>Load Prayer Times</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = ({ countries, provinces, cities }) => {
    return { 
        // COUNTRIES. THIS IS LOADED IN THE HOME COMPONENT SO WE DONT NEED TO LOAD IT IN HERE
        dataCountries: countries.data,
        errorCountries: countries.error,
        isLoadingCountries: countries.isLoading,
        isErrorCountries: countries.isError,
        // ==========
        // PROVINCES
        dataProvinces: provinces.data,
        errorProvinces: provinces.error,
        isLoadingProvinces: provinces.isLoading,
        isErrorProvinces: provinces.isError,
        // ==========
        // CITIES
        dataCities: cities.data,
        errorCities: cities.error,
        isLoadingCities: cities.isLoading,
        isErrorCities: cities.isError
        // ==========
    };
};

export default connect(mapStateToProps, { fetchProvinces, fetchCities })(CountryForm)