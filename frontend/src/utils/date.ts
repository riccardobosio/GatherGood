export function formatDate(inputDate: string): string {
    const date = new Date(inputDate);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
    };

    // Format the date
    return date.toLocaleDateString('en-US', options);
}
