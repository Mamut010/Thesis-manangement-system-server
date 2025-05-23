import { ConcreteBinaryFilter, ConcreteListFilter } from "./concrete-filter";
import { WhereQueryObject } from "./query-object";

export type BinaryAndListFilters = {
    binaryFilters: Record<string, ConcreteBinaryFilter[]>,
    listFilters: Record<string, ConcreteListFilter[]>
}

export type WhereWithFieldMap = {
    where: WhereQueryObject,
    fieldMap: Record<string, string>,
}

export type WhereObjectCreationConfig = {
    fieldNamePrefix: string,
    reversedFieldNameMap?: Record<string, string>,
}