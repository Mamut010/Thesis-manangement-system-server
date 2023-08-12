import { DateTime } from "luxon";
import { TextField } from "./text-field";
import { DATETIME_FORMATS } from "../../../contracts/constants/datetime-formats";
import { isDateObject } from "../../../utils/object-helpers";

export class DateField extends TextField {
    private _date?: Date | null;
    private _format: Intl.DateTimeFormatOptions;

    constructor(
        name: string, 
        date?: Date | string | null, 
        format: Intl.DateTimeFormatOptions = DATETIME_FORMATS.DATE_LONG) {
        super(name);
        this._format = format;
        this.date = date;
    }

    get date() {
        return this._date;
    }

    set date(value: Date | string | null | undefined) {
        this._date = this.computeDate(value);
        this.value = this.computeDateString();
    }

    get format(): Intl.DateTimeFormatOptions {
        return this._format;
    }

    set format(format: Intl.DateTimeFormatOptions) {
        this._format = format;
        this.value = this.computeDateString();
    }

    private computeDate(value: Date | string | null | undefined) {
        const result = typeof value === 'string' ? new Date(value) : value;
        if (result && !isDateObject(result, true)) {
            throw new Error('Invalid date');
        }
        return result; 
    }

    private computeDateString() {
        return this._date ? DateTime.fromJSDate(this._date).toLocaleString(this._format) : this._date;
    }
}