import { DateTime } from "luxon";
import { TextField } from "./text-field";
import { DATETIME_FORMATS } from "../../../contracts/constants/datetime-formats";
import { isDateObject } from "../../../utils/object-helpers";

export class DateField extends TextField {
    constructor(
        public name: string, 
        public date?: Date | string | null, 
        public format: Intl.DateTimeFormatOptions = DATETIME_FORMATS.DATE_LONG) {
        date = typeof date === 'string' ? new Date(date) : date;
        if (date && !isDateObject(date, true)) {
            throw new Error('Invalid date');
        }    

        const value = date ? DateTime.fromJSDate(date).toLocaleString(format) : date;
        super(name, value);
    }
}