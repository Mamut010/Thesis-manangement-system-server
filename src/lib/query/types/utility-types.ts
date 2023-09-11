import { ConcreteBinaryFilter, ConcreteListFilter } from "./concrete-filter";
import { WhereQueryObject } from "./query-object";

export interface BinaryAndListFilters {
    binaryFilters: Record<string, ConcreteBinaryFilter[]>,
    listFilters: Record<string, ConcreteListFilter[]>
}

export interface WhereWithFieldMap {
    where: WhereQueryObject,
    fieldMap: Record<string, string>,
}

export interface WhereObjectCreationConfig {
    fieldNamePrefix: string,
    reversedFieldNameMap?: Record<string, string>,
}