export function formatDate(date, weekDay = false) {
    const formatedDate = new Date(date);
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    };

    if (weekDay) {
        options.weekday = 'long';
    }

    return formatedDate.toLocaleDateString('en-US', options);

}