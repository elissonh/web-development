export function addDays(date, days) {
    const result = new Date(date); 
    result.setDate(result.getDate() + days);

    return result;
}

export function formatDateToString(date) {
    const options = {
        weekday: 'long', // full weekday name (e.g., "Monday")
        month: 'long',   // full month name (e.g., "January")
        day: 'numeric'   // day of the month (e.g., "1")
    };
    const dateString = new Intl.DateTimeFormat(undefined, options).format(date);
    
    return dateString;
}