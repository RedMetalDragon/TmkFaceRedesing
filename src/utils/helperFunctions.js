function formatTime(timeString) {
    const [hours, minutes, period] = timeString.split(':');
    let formattedHours = parseInt(hours, 10);
    let formattedPeriod = period.toUpperCase().substring(2, period.length);

    if (formattedHours === 0) {
        formattedHours = 12;
    } else if (formattedHours > 12) {
        formattedHours -= 12;
        formattedPeriod = 'PM';
    }

    return `${formattedHours}:${minutes} ${formattedPeriod}`;
}

function currencySymbol(currency) {
    switch (currency) {
        case 'usd':
            return '$';
        case 'eur':
            return '€';
        case 'gbp':
            return '£';
        case 'jpy':
            return '¥';
        case 'aud':
            return 'A$';
        case 'cad':
            return 'C$';
        default:
            return currency.toUpperCase();
    }
}

function getBaseUrl() {
    const currentUrl = window.location.href;
    return currentUrl.split('/')[0] + '//' + currentUrl.split('/')[2];
}

function getSuccessUrl() {
    return `${getBaseUrl()}/payment/success`;
}

function getErrorUrl() {
    return `${getBaseUrl()}/payment/error`;
}

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
        ? isoCode.toUpperCase().replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

export { formatTime, currencySymbol, getSuccessUrl, getErrorUrl, countryToFlag };