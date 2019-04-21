import moment                         from 'moment';
import React, { useState, useEffect } from 'react';
import { connect }                    from 'react-redux';
import { isMobileOnly }               from "react-device-detect";

function PrayerTimeToday({ today, openMenu }) {
    const time = useSetInterval(today);

    return (
        <React.Fragment>
            <div className="row justify-content-md-center mb30">
                <div className="col-12 col-sm-12 col-md-10 col-lg-7">
                    <div id="prayer-countdown">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="prayer-countdown__time">{time}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 col-sm-4 col-md-4">
                                <div className="prayer-countdown__name text-right">hours</div>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4">
                                <div className="prayer-countdown__name">minutes</div>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4">
                                <div className="prayer-countdown__name text-left">seconds</div>
                            </div>
                        </div>
                        {
                            !isMobileOnly && <div id="open-prayer-times-table" onClick={openMenu}>Show more...</div>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const useSetInterval = ({ time }) => {
    const prayerTime        = moment(time, 'DD-MM-YYYY HH:mm');
    const currentDifference = formatSecondsToCountdown(prayerTime);

    const [countdown, setCountdown] = useState(currentDifference);

    useEffect(() => {
        const timeOut = setTimeout(() => setCountdown(formatSecondsToCountdown(prayerTime)), 1000);
        return () => clearTimeout(timeOut);
    }, [countdown]);  

    return countdown;
};

const formatSecondsToCountdown = prayerTime => {
    const now                 = moment().format('YYYY-MM-DD HH:mm:ss');
    const differenceInSeconds = prayerTime.diff(now);

    // FORMAT THE DIFFERENCE IN SECONDS BETWEEN 'NOW' AND 'PRAYERTIME' TO 'HH:mm:ss'
    return moment.utc(differenceInSeconds).format('HH:mm:ss');
};

const mapStateToProps = ({ prayerTimes }) => {
    return { 
        today: prayerTimes.data.today,
    };
};

export default connect(mapStateToProps)(PrayerTimeToday);