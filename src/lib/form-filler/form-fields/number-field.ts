import { DateTime } from "luxon";
import { TextField } from "./text-field";
import { DATETIME_FORMATS } from "../../../contracts/constants/datetime-formats";
import { isDateObject } from "../../../utils/object-helpers";

export class NumberField extends TextField {
    private _number?: number | null;

    constructor(name: string, number?: number | null) {
        super(name);
        this.number = number;
    }

    get number() {
        return this._number;
    }

    set number(value: number| null | undefined) {
        this._number = value;
        this.value = this.computeNumberString();
    }

    private computeNumberString() {
        return typeof this._number === 'number' ? this._number.toString() : this._number;
    }
}