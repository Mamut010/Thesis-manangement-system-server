import moment from "moment";
import { TextField } from "./text-field";

export class DateField extends TextField {
    constructor(public name: string, public date?: Date | string, public format?: string) {
        super(name, moment(date).format(format));
    }
}