import { NumberFieldOptions } from "../../types/utility-types";
import { computeNumberLocale } from "../../utils/locale-helpers";
import { TextField } from "../basic/text-field";

export class NumberField extends TextField {
    private _number?: number | null;
    private _locale?: string;
    private _format?: Intl.NumberFormatOptions;

    constructor(name: string, number?: number | null, options?: NumberFieldOptions) {
        super(name);
        this._locale = computeNumberLocale(options?.locale);
        this._format = options?.format;
        this.number = number;
    }

    get number() {
        return this._number;
    }

    set number(value: number| null | undefined) {
        this._number = value;
        this.recomputeTextValue();
    }

    get locale() {
        return this._locale;
    }

    set locale(value: string | undefined) {
        this._locale = computeNumberLocale(value);
        this.recomputeTextValue();
    }

    get format() {
        return this._format;
    }

    set format(value: Intl.NumberFormatOptions | undefined) {
        this._format = value;
        this.recomputeTextValue();
    }

    private recomputeTextValue() {
        this.value = typeof this._number === 'number' 
            ? this._number.toLocaleString(this._locale, this._format) 
            : this._number;
    }
}