import { computeNumberLocale } from "../utils/locale-helpers";
import { TextField } from "./text-field";

export class NumberField extends TextField {
    private _number?: number | null;
    private _locale?: string;

    constructor(name: string, number?: number | null, locale?: string) {
        super(name);
        this._locale = computeNumberLocale(locale);
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

    private recomputeTextValue() {
        this.value = typeof this._number === 'number' ? this._number.toLocaleString(this._locale) : this._number;
    }
}