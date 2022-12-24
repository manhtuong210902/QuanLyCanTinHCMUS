export const formatDay = (day) => {
    let arrDay = day.split('-');
    let year = arrDay[0];
    let month = arrDay[1];
    let date = arrDay[2];
    return date + '/' + month + '/' + year;
};

export const formatMonth = (monthDay) => {
    let arrDay = monthDay.split('-');
    let year = arrDay[0];
    let month = arrDay[1];
    return month + '/' + year;
};

export const getCurrDay = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    return today;
};
export const getCurrentDate = (separator = '-') => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`;
};

export function addTimes(startTime, endTime) {
    let times = [0, 0];
    let max = times.length;

    let a = (startTime || '').split(':');
    let b = (endTime || '').split(':');

    // normalize time values
    for (var i = 0; i < max; i++) {
        a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
        b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
    }

    // store time values
    for (let i = 0; i < max; i++) {
        times[i] = a[i] + b[i];
    }

    let hours = times[0];
    let minutes = times[1];

    if (minutes >= 60) {
        let h = (minutes / 60) << 0;
        hours += h;
        minutes -= 60 * h;
    }

    return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2);
}