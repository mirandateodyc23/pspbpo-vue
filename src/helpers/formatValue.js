function formatValue(data, value, key, object_data_key = null) {
    let currency = (data.market.includes('Filipino') && data.market.length == 1) ? 'PHP' : 'USD';
    let decimalFormatter = new Intl.NumberFormat('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2});

    function formatDate (date_pass) {
        const date = new Date(date_pass);
        if(date == 'Invalid Date') {
            return '';
        }
        const newDate = date.toLocaleDateString();
        const splitedDate =  newDate.split('/');
        return `${splitedDate [2]}-${(splitedDate[0]).length == 1 ? '0' + splitedDate[0] : splitedDate[0]}-${(splitedDate[1]).length == 1 ? '0' + splitedDate[1] : splitedDate[1]}`;
    }

    if(key == 'salary' || (key =='career' && object_data_key == 'salary_package')) {
        return `${currency} ${decimalFormatter.format(value)}`;
    }
    else if (key =='qualification' && (object_data_key == 'from' || object_data_key == 'to')) {
        return new Date(value).getFullYear();
    }
    else if (key == 'start_date' || key == 'birthdate' || (key =='career' && (object_data_key == 'from' || object_data_key == 'to'))) {
        return formatDate(value);
    }
    else {
        return (value != undefined && value != null) ? value : '';
    }
}

export default formatValue;