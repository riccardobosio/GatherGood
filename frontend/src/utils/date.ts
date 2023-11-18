export function formatDate(inputDate: string, includeTime: boolean = true): string {
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
    };

    // Format the date
    if (!includeTime) {
        delete options.hour;
        delete options.minute;
        delete options.second;
        delete options.timeZoneName;
    }

    return date.toLocaleDateString('es-ES', options);
}


export function getCurrentDateTime(): string {
    const currentDate = new Date();
    return currentDate.toISOString().replace(/\.\d+Z$/, '.000Z');
}