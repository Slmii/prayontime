import React       from 'react';
import { connect } from 'react-redux';

function PrayerTimesToday({ data: { prayers }}) {
    const { Imsak, Gunes, Ogle, Ikindi, Aksam, Yatsi } = prayers[0];

    return (
        <React.Fragment>
            <div className="f-row">
                <div className="f-col">
                    <div>Fajr</div>
                </div>
                <div className="f-col">
                    <div>Sunrise</div>
                </div>
                <div className="f-col">
                    <div>Dhuhr</div>
                </div>
                <div className="f-col">
                    <div>Asr</div>
                </div>
                <div className="f-col">
                    <div>Maghrib</div>
                </div>
                <div className="f-col">
                    <div>Isha</div>
                </div>
            </div>
            <div className="f-row">
                <div className="f-col">
                    <div className="prayer-today">{Imsak}</div>
                </div>
                <div className="f-col">
                    <div className="prayer-today">{Gunes}</div>
                </div>
                <div className="f-col">
                    <div className="prayer-today">{Ogle}</div>
                </div>
                <div className="f-col">
                    <div className="prayer-today">{Ikindi}</div>
                </div>
                <div className="f-col">
                    <div className="prayer-today">{Aksam}</div>
                </div>
                <div className="f-col">
                    <div className="prayer-today">{Yatsi}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = ({ prayerTimes }) => {
    return { 
        data: prayerTimes.data,
    };
};

export default connect(mapStateToProps)(PrayerTimesToday);
