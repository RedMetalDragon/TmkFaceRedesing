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

export { formatTime };
