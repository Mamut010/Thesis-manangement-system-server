import { BinaryFilter } from "../interfaces/binary-filter";
import { ListFilter } from "../interfaces/list-filter";

export type ValidatingRequest<T> = Partial<T>;

export type BinaryOrListFilter<T = unknown> = 
    T extends BinaryFilter<infer TValue, infer TOperator> | ListFilter<infer TValue> ? T  : never;