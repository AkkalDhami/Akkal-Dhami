export const dateFormater = (dateStr, isFullDate = false) => {
    const date = new Date(dateStr);
    const options = isFullDate
        ? {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            weekday: 'long'
        }
        : {
            year: 'numeric',
            month: 'long'
        };
    return date.toLocaleDateString(undefined, options);
}