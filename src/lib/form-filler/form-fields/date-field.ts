import { DateTime } from "luxon";
import { TextField } from "./text-field";
import { DATETIME_FORMATS } from "../../../contracts/constants/datetime-formats";

export class DateField extends TextField {
    constructor(
        public name: string, 
        public date?: Date | string | null, 
        public format: Intl.DateTimeFormatOptions = DATETIME_FORMATS.DATE_LONG) {
        date = typeof date === 'string' ? new Date(date) : date;
        const value = date ? DateTime.fromJSDate(date).toLocaleString(format) : date;
        super(name, value);
    }
}