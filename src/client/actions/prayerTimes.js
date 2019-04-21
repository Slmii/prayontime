import axios        from 'axios';
import lscache      from 'lscache';
import moment       from 'moment';

import { 
    FETCH_PRAYER_TIMES_SUCCESS,
    FETCH_PRAYER_TIMES_FAILURE
} from './types';

lscache.enableWarnings(true);

export const fetchPrayerTimesDiyanet = cityId => async dispatch => {

    if (!lscache.supported()) 
    {
        alert('Local storage is unsupported in this browser. Please use Chrome/Firefox');
        return;
    }

    lscache.flushExpired();

    if (lscache.get(`prayerTimes${cityId}`))
    {
        console.log('Get localstorage Prayer Times', localStorage.getItem('cityId'), localStorage.getItem('cityName'));

        const { prayersData, todayData } = processPrayerTimes(JSON.parse(lscache.get(`prayerTimes${cityId}`)).data);

        dispatch({
            type: FETCH_PRAYER_TIMES_SUCCESS,
            payload: { prayers: prayersData, today: todayData }
        });
        
        return;
    }

    if (cityId)
    {
        try {
            // GET THE PRAYER (DIYANET TIMES)
            const response = await axios.get(`https://ezanvakti.herokuapp.com/vakitler?ilce=${cityId}`);
            if (response.status === 200)
            {
                console.log('Request to API Prayer Times', cityId); 
                
                const data = response.data.map(({ Aksam, Gunes, Ikindi, Imsak, MiladiTarihKisa, Ogle, Yatsi }) => {
                    return {
                        Aksam,
                        Gunes,
                        Ikindi,
                        Imsak,
                        MiladiTarihKisa,
                        Ogle,
                        Yatsi
                    };
                });
    
                lscache.set(`prayerTimes${cityId}`, JSON.stringify({ data }), 25 * 24 * 60); // DAYS * 24 * 60
                
                const { prayersData, todayData } = processPrayerTimes(data);
                dispatch({
                    type: FETCH_PRAYER_TIMES_SUCCESS,
                    payload: { prayers: prayersData, today: todayData }
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
                type: FETCH_PRAYER_TIMES_FAILURE,
                error: (error.response) ? error.response : error
            });
        }
    }

        
    // // const now = new Date();
    // // const m   = now.getMonth() + 1;
    // // const y   = now.getFullYear();
    // GET PRAYER TIMES
    // const response = await axios.get(`https://api.aladhan.com/v1/calendarByCity?city=Emmen&country=NL&method=13&school=2&timezonestring=Europe/Amsterdam&month=${m}&year=${y}`);
    // if (response.status === 200) 
    // {
    //     // LIMIT
    //     let limit = 0;

    //     // TODAY'S DATE
    //     const momentTodayDate  = moment().format('YYYY-MM-DD');

    //     const prayersData = response.data.data.filter(({ date }) => {
    //         const { gregorian }           = date;
    //         const { date: gregorianDate } = gregorian;

    //         // PRAYER'S DATE
    //         const momentPrayerDate = moment(gregorianDate, 'DD-MM-YYYY').format('YYYY-MM-DD');

    //         // SKIP THE DATES IN THE PAST AND ALLOW 5 PRAYER DATES TO BE SHOWN
    //         return (moment(momentTodayDate).isSameOrBefore(momentPrayerDate) && limit++ < 5);
    //     });

    //     // GET THE FAJR TIME FOR TOMORROW
    //     const fajrTomorrow             = prayersData[1];
    //     const fajrTimeTomorrow         = fajrTomorrow.timings.Fajr.split(' ')[0];
    //     const momentFajrTomorrow       = moment(`${fajrTomorrow.date.gregorian.date} ${fajrTimeTomorrow}`, 'DD-MM-YYYY HH:mm');
    //     const momentFajrTomorrowFormat = momentFajrTomorrow.format('YYYY-MM-DD HH:mm');

    //     // CONVERT EACH PRAYER TIME OF TODAY TO MOMENT.JS DATE
    //     const gregorianDateToday                           = prayersData[0].date.gregorian.date;
    //     const { Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha } = prayersData[0].timings;
    //     const momentFajr                                   = moment(`${gregorianDateToday} ${Fajr.split(' ')[0]}`, 'DD-MM-YYYY HH:mm');
    //     const momentSunrise                                = moment(`${gregorianDateToday} ${Sunrise.split(' ')[0]}`, 'DD-MM-YYYY HH:mm');
    //     const momentDhuhr                                  = moment(`${gregorianDateToday} ${Dhuhr.split(' ')[0]}`, 'DD-MM-YYYY HH:mm');
    //     const momentAsr                                    = moment(`${gregorianDateToday} ${Asr.split(' ')[0]}`, 'DD-MM-YYYY HH:mm');
    //     const momentMaghrib                                = moment(`${gregorianDateToday} ${Maghrib.split(' ')[0]}`, 'DD-MM-YYYY HH:mm');
    //     const momentIsha                                   = moment(`${gregorianDateToday} ${Isha.split(' ')[0]}`, 'DD-MM-YYYY HH:mm');
        
    //     // CONVERT TO CUSTOM FORMAT
    //     const momentFajrFormat    = momentFajr.format('YYYY-MM-DD HH:mm');
    //     const momentSunriseFormat = momentSunrise.format('YYYY-MM-DD HH:mm');
    //     const momentDhuhrFormat   = momentDhuhr.format('YYYY-MM-DD HH:mm');
    //     const momentAsrFormat     = momentAsr.format('YYYY-MM-DD HH:mm');
    //     const momentMaghribFormat = momentMaghrib.format('YYYY-MM-DD HH:mm');
    //     const momentIshaFormat    = momentIsha.format('YYYY-MM-DD HH:mm');
        
    //     // VARIABLES
    //     let minutes;
    //     let prayerTitle;

    //     // GET CURRENT DATE WITH SECONDS
    //     const now = moment().format('YYYY-MM-DD HH:mm:ss');
    //     // GET THE CURRENT PRAYER'S TITLE AND REMAINING MINUTES UNTILL NEXT PRAYER
    //     if (moment(now).isSameOrAfter(momentFajrFormat) && moment(now).isBefore(momentSunriseFormat))
    //     {
    //         minutes = momentSunrise.diff(now, 'minutes');
    //         prayerTitle = 'Fajr';
    //     }
    //     else if (moment(now).isSameOrAfter(momentSunriseFormat) && moment(now).isBefore(momentDhuhrFormat))
    //     {
    //         minutes = momentDhuhr.diff(now, 'minutes');
    //         prayerTitle = 'Wait till Dhuhr';
    //     }
    //     else if (moment(now).isSameOrAfter(momentDhuhrFormat) && moment(now).isBefore(momentAsrFormat))
    //     {
    //         minutes = momentAsr.diff(now, 'minutes');
    //         prayerTitle = 'Dhuhr';
    //     }
    //     else if (moment(now).isSameOrAfter(momentAsrFormat) && moment(now).isBefore(momentMaghribFormat))
    //     {
    //         minutes = momentMaghrib.diff(now, 'minutes');
    //         prayerTitle = 'Asr';
    //     }
    //     else if (moment(now).isSameOrAfter(momentMaghribFormat) && moment(now).isBefore(momentIshaFormat))
    //     {
    //         minutes = momentIsha.diff(now, 'minutes');
    //         prayerTitle = 'Maghrib';
    //     }
    //     else if (moment(now).isSameOrAfter(momentIshaFormat) && moment(now).isBefore(momentFajrTomorrowFormat))
    //     {
    //         minutes = momentFajrTomorrow.diff(now, 'minutes');
    //         prayerTitle = 'Isha';
    //     }

    //     // GET THE HOURS IN THE MINUTES AND GET THE REMAINING MINUTES
    //     const hours            = Math.trunc(minutes / 60);
    //     const remainingMinutes = minutes % 60;

    //     const todayData = {
    //         hours,
    //         minutes: remainingMinutes,
    //         prayerTitle
    //     }
        
    //     dispatch(fetchPrayerTimesSuccess({ prayers: prayersData, today: todayData }));
    // }
    // else
    // {
    //     dispatch(fetchPrayerTimesFail(response.status));
    // }
};

const processPrayerTimes = (prayers) => {
    // TODAY'S DATE
    const momentTodayDate  = moment().format('YYYY-MM-DD');

    const prayersData = prayers.filter(({ MiladiTarihKisa }) => {
        // PRAYER'S DATE
        const momentPrayerDate = moment(MiladiTarihKisa, 'DD-MM-YYYY').format('YYYY-MM-DD');

        // SKIP THE DATES IN THE PAST AND ALLOW 5 PRAYER DATES TO BE SHOWN
        return (moment(momentTodayDate).isSameOrBefore(momentPrayerDate));
    });

    // GET THE FAJR TIME FOR TOMORROW
    const fajrTomorrow             = prayersData[1];
    const momentFajrTomorrow       = moment(`${fajrTomorrow.MiladiTarihKisa} ${fajrTomorrow.Imsak}`, 'DD.MM.YYYY HH:mm');
    const momentFajrTomorrowFormat = momentFajrTomorrow.format('YYYY-MM-DD HH:mm');

    // CONVERT EACH PRAYER TIME OF TODAY TO MOMENT.JS DATE
    const { 
        MiladiTarihKisa: calenderDateToday,
        Imsak: Fajr, 
        Gunes: Sunrise, 
        Ogle: Dhuhr, 
        Ikindi: Asr, 
        Aksam: Maghrib, 
        Yatsi: Isha 
    } = prayersData[0];
    const momentFajr        = moment(`${calenderDateToday} ${Fajr}`, 'DD-MM-YYYY HH:mm');
    const momentSunrise     = moment(`${calenderDateToday} ${Sunrise}`, 'DD-MM-YYYY HH:mm');
    const momentDhuhr       = moment(`${calenderDateToday} ${Dhuhr}`, 'DD-MM-YYYY HH:mm');
    const momentAsr         = moment(`${calenderDateToday} ${Asr}`, 'DD-MM-YYYY HH:mm');
    const momentMaghrib     = moment(`${calenderDateToday} ${Maghrib}`, 'DD-MM-YYYY HH:mm');
    const momentIsha        = moment(`${calenderDateToday} ${Isha}`, 'DD-MM-YYYY HH:mm');
    
    // CONVERT TO CUSTOM FORMAT
    const momentFajrFormat    = momentFajr.format('YYYY-MM-DD HH:mm');
    const momentSunriseFormat = momentSunrise.format('YYYY-MM-DD HH:mm');
    const momentDhuhrFormat   = momentDhuhr.format('YYYY-MM-DD HH:mm');
    const momentAsrFormat     = momentAsr.format('YYYY-MM-DD HH:mm');
    const momentMaghribFormat = momentMaghrib.format('YYYY-MM-DD HH:mm');
    const momentIshaFormat    = momentIsha.format('YYYY-MM-DD HH:mm');

    // VARIABLES
    // let minutes;
    let prayerTitle;
    let time;

    // GET CURRENT DATE WITH SECONDS
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    // GET THE CURRENT PRAYER'S TITLE AND REMAINING MINUTES UNTILL NEXT PRAYER
    if (moment(now).isSameOrAfter(momentFajrFormat) && moment(now).isBefore(momentSunriseFormat))
    {
        // minutes = momentSunrise.diff(now, 'minutes');
        prayerTitle = 'Fajr';
        time = momentSunrise;
    }
    else if (moment(now).isSameOrAfter(momentSunriseFormat) && moment(now).isBefore(momentDhuhrFormat))
    {
        // minutes = momentDhuhr.diff(now, 'minutes');
        prayerTitle = 'Dhuhr';
        time = momentDhuhr;
    }
    else if (moment(now).isSameOrAfter(momentDhuhrFormat) && moment(now).isBefore(momentAsrFormat))
    {
        // minutes = momentAsr.diff(now, 'minutes');
        prayerTitle = 'Dhuhr';
        time = momentAsr;
    }
    else if (moment(now).isSameOrAfter(momentAsrFormat) && moment(now).isBefore(momentMaghribFormat))
    {
        // minutes = momentMaghrib.diff(now, 'minutes');
        prayerTitle = 'Asr';
        time = momentMaghrib;
    }
    else if (moment(now).isSameOrAfter(momentMaghribFormat) && moment(now).isBefore(momentIshaFormat))
    {
        // minutes = momentIsha.diff(now, 'minutes');
        prayerTitle = 'Maghrib';
        time = momentIsha;
    }
    else if (moment(now).isSameOrAfter(momentIshaFormat) && moment(now).isBefore(momentFajrTomorrowFormat))
    {
        // TODO: CHECK IF DATE IF AFTER MIDNIGHT, THEN GET THE TIME OF AFTER MIDNIGHT TILL FAJR TODAY
        // minutes = momentFajrTomorrow.diff(now, 'minutes');
        prayerTitle = 'Isha';
        time = momentFajrTomorrow;
    }
    else
    {
        // minutes = momentFajr.diff(now, 'minutes');
        prayerTitle = 'Isha';
        time = momentFajr;
    }

    // GET THE HOURS IN THE MINUTES AND GET THE REMAINING MINUTES
    // const hours            = Math.trunc(minutes / 60);
    // const remainingMinutes = minutes % 60;

    const todayData = {
        // hours,
        // minutes: remainingMinutes,
        time,
        prayerTitle
    }

    return { prayersData, todayData };
};