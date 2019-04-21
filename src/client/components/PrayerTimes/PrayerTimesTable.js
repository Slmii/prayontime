import moment      from 'moment';
import React       from 'react';
import { connect } from 'react-redux';

function PrayerTimesTable({ data: { prayers }, visibility }) {

    const renderTableRows = () => {
        return prayers.map((prayer, index) => {
            const { 
                MiladiTarihKisa: calenderDateToday,
                Imsak: Fajr, 
                Gunes: Sunrise, 
                Ogle: Dhuhr, 
                Ikindi: Asr, 
                Aksam: Maghrib, 
                Yatsi: Isha 
            } = prayer;

            return  <tr key={index}>
                        <td>{moment(calenderDateToday, 'DD.MM.YYYY').format('DD-MM-YYYY')}</td>
                        <td>{Fajr}</td>
                        <td>{Sunrise}</td>
                        <td>{Dhuhr}</td>
                        <td>{Asr}</td>
                        <td>{Maghrib}</td>
                        <td>{Isha}</td>
                    </tr>;
        });
    };

    return (
        <div id="prayer-times-table" className={visibility ? "show" : "hide"}>
            <table className="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Fajr</th>
                        <th scope="col">Sunrise</th>
                        <th scope="col">Dhuhr</th>
                        <th scope="col">Asr</th>
                        <th scope="col">Maghrib</th>
                        <th scope="col">Isha</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = ({ prayerTimes }) => {
    return { 
        data: prayerTimes.data,
    };
};

export default connect(mapStateToProps)(PrayerTimesTable);
