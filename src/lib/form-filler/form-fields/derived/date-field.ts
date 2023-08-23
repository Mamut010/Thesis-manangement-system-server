import { DateTime } from "luxon";
import { TextField } from "../basic/text-field";
import { isDateObject } from "../../../../utils/object-helpers";
import { DEFAULTS } from "../../constants/default";
import { computeDateTimeLocale } from "../../utils/locale-helpers";
import { DateFieldOptions } from "../../types/utility-types";

export class DateField extends TextField {
    private _date?: Date | null;
    private _format?: Intl.DateTimeFormatOptions;
    private _locale?: string;

    constructor(
        name: string, 
        date?: Date | null, 
        options?: DateFieldOptions) {
        super(name);
        this._format = options?.format ?? DEFAULTS.DateFormat;
        this._locale = computeDateTimeLocale(options?.locale ?? DEFAULTS.Locale);
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