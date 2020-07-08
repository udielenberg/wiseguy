import { format } from "date-fns";

const MM_DD_YYYY_FORMAT = 'MM/dd/yyyy';

export const formattedDate = (date: Date) => {
    try {
        return format(date, MM_DD_YYYY_FORMAT)
    } catch (err) {
        console.error(`invalid date object:', ${date}`);
        return 'invalid date'
    }
}