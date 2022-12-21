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
