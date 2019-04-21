import React, { useState, useEffect } from 'react';
import { connect }                    from 'react-redux';
// import {
//     BrowserView,
//     MobileView,
//     isBrowser,
//     isMobile
// } from "react-device-detect";

import { fetchCountries }          from '../../actions/countries';
import { fetchPrayerTimesDiyanet } from '../../actions/prayerTimes';

import CountryForm      from '../Country/CountryForm';
import PrayerTimeCity   from '../PrayerTimes/PrayerTimeCity';
import PrayerTimeToday  from '../PrayerTimes/PrayerTimeToday';
import PrayerTimesToday from '../PrayerTimes/PrayerTimesToday';
import PrayerTimesTable from '../PrayerTimes/PrayerTimesTable';

function Home(props) {
    const [visible, setVisible]   = useState(false);
    const [showForm, setShowForm] = useState(!localStorage.getItem('cityId') ? true : false);

    useEffect(() => {
        if (!showForm) 
        {
            // COUNTRIES WILL BE FETCHED ONLY ONCE FROM THE API. AS LONG AS THE LOCALSTORAGE IS NOT REMOVED, IT WILL ALWAYS CALL THE COUNTRIES DATA FROM THE LOCALSTORAGE
            props.fetchCountries();
            props.fetchPrayerTimesDiyanet(localStorage.getItem('cityId'));
        }
    }, [showForm]);

    const toggleMenu = () => setVisible(!visible);
    const toggleForm = () => setShowForm(!showForm);

    const renderComponents = () => {
        const { data: { today: { prayerTitle } }, isError, error } = props;

        if (isError)
        {
            // MAKE AN ERROR COMPONENT
            return <React.Fragment>{error}</React.Fragment>
        }

        return  <React.Fragment>
                    <div className="row mb30">
                        <div className="col-md-12">
                            <div id="current-prayer-info">{prayerTitle}</div>
                        </div>
                    </div>
                    <PrayerTimeToday openMenu={toggleMenu} />
                    <PrayerTimesToday />
                    <PrayerTimesTable visibility={visible} />
                    <PrayerTimeCity openForm={toggleForm} />
                </React.Fragment>
    };

    if (showForm) return <CountryForm openForm={toggleForm} />;

    return (
        <React.Fragment>
            <div className="row text-center" onClick={visible ? toggleMenu : () => {}}>
                <div className="col-md-12">
                    <div id="mosque-icon"><i className="fas fa-mosque"></i></div>
                    {
                        props.isLoading 
                        ? <div className="loading-text">Loading Prayer Times!</div>
                        : renderComponents()
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = ({ prayerTimes }) => {
    return { 
        data: prayerTimes.data,
        error: prayerTimes.error,
        isLoading: prayerTimes.isLoading,
        isError: prayerTimes.isError
    };
};

export default {
    component: connect(mapStateToProps, { fetchPrayerTimesDiyanet, fetchCountries })(Home)
};