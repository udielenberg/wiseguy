import { format } from "date-fns";

const MM_DD_YYYY_FORMAT = 'MM/dd/yyyy';

export const formattedDate = (date: Date) => format(date, MM_DD_YYYY_FORMAT)