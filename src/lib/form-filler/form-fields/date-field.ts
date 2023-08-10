import { DateTime } from "luxon";
import { TextField } from "./text-field";
import { DATETIME_FORMATS } from "../../../contracts/constants/datetime-formats";

export class DateField extends TextField {
    constructor(
        public name: string, 
        public date?: Date | string, 
        public format: Intl.DateTimeFormatOptions = DATETIME_FORMATS.DATE_LONG) {
        date = typeof date === 'string' ? new Date(date) : date;
        const value = typeof date !== 'undefined' ? DateTime.fromJSDate(date).toLocaleString(format) : undefined;
        super(name, value);
    }
}