import { Title } from "../contracts/constants/title";
import { Sex } from "../core/constants/sex";

export function getSexFromNumericCode(code: number): Sex {
    switch(code) {
        case Sex.NotKnown: return Sex.NotKnown;
        case Sex.Male: return Sex.Male;
        case Sex.Female: return Sex.Female;
        default: return Sex.NotApplicable;
    }
}

export function sexToTitle(sex: Sex): Title | undefined {
    switch(sex) {
        case Sex.Male: return Title.Mr;
        case Sex.Female: return Title.Ms;
        default: return undefined;
    }
}