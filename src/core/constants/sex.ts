import { valuesOf } from "../../utils/object-helpers";
import { ValueOf } from "../../utils/types";

/**
 * ISO/IEC 5218: Codes for the representation of human sexes is an international standard 
 * that defines a representation of human sexes through a language-neutral single-digit code.
 * It can be used in information systems such as database applications.
 * 
 * @see https://en.wikipedia.org/wiki/ISO/IEC_5218
 */
export const Sex = {
    NotKnown: 0,
    Male: 1,
    Female: 2,
    NotApplicable: 9,
} as const;

export type Sex = ValueOf<typeof Sex>;

export const Sexes = valuesOf(Sex);