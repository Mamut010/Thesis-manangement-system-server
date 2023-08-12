import { DateTime } from "luxon";
import { TextField } from "./text-field";
import { isDateObject } from "../../../utils/object-helpers";
import { DEFAULTS } from "../constants/default";
import { computeDateTimeLocale } from "../utils/locale-helpers";

export class DateField extends TextField {
    private _date?: Date | null;
    private _format?: Intl.DateTimeFormatOptions;
    private _locale?: string;

    constructor(
        name: string, 
        date?: Date | null, 
        format: Intl.DateTimeFormatOptions | undefined = DEFAULTS.DateFormat,
        locale: string | undefined = DEFAULTS.Locale) {
        super(name);
        this._format = format;
        this._locale = computeDateTimeLocale(locale);
        this.date = date;
    }

    get date() {
        return this._date;
    }

    set date(value: Date | null | undefined) {
        this._date = this.computeDate(value);
        this.recomputeTextValue();
    }

    get format() {
        return this._format;
    }

    set format(format: Intl.DateTimeFormatOptions | undefined) {
        this._format = format;
        this.recomputeTextValue();
    }

    get locale() {
        return this._locale;
    }

    set locale(locale: string | undefined) {
        this._locale = computeDateTimeLocale(locale);
        this.recomputeTextValue();
    }

    private computeDate(value: Date | null | undefined) {
        if (value && !isDateObject(value, true)) {
            throw new Error('Invalid date');
        }
        return value; 
    }

    private recomputeTextValue() {
        this.value = this._date
            ? DateTime.fromJSDate(this._date).toLocaleString(this._format, { locale: this._locale }) 
            : this._date;
    }
}