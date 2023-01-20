
export const dataUtils = () => {
    const formatDataDigit = (data) => {
        var d = new Date(data),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join(' de ');
    }

    const formatDataString = (data) => {
        let dataP = new Date(data).toDateString().split(' ')
        let dataD = data.split('T')[0].split('-')
        let dia = dataD[2]
        let mes = dataP[1]
        let ano = dataP[3]

        return [dia, mes, ano].join(' de ');
    }

    const formatDataStringY = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
    return {
        formatDataDigit,
        formatDataString,
        formatDataStringY
    }
}