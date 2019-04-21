import React from 'react';

export default function PrayerTimeCity(props) {
    return (
        <React.Fragment>
            <div className="row justify-content-md-center mt30">
                <div className="col-md-4">
                    <div id="city" onClick={props.openForm}>
                        {localStorage.getItem('cityName')}
                    </div>
                    <hr />
                    <div id="method-info"><span id="method-info__text">Method</span> <span id="method-info__method">Diyanet</span></div>
                </div>
            </div>
        </React.Fragment>
    );
};
