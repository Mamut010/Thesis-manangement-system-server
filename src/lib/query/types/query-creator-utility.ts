import { OrderBy } from "../order-by";
import { Pagination } from "../pagination";

export interface AutoQueryCreatable {
    [key: string]: any,
    pagination?: Pagination,
    orderBy?: OrderBy | OrderBy[],
}

export interface AutoQueryCreationOptions {
    /**
     * If set, any property with the specified suffix is considered a filter, 
     * and its trimmed suffix name is the field that the filter will apply on.
     * 
     * This option has higher priority than 'filterPrefix' option. If this option is set, 'filterPrefix' is ignored.
     * 
     * Either this option or 'filterPrefix' option must be set.
     * 
     * @default Filter
     */
    filterSuffix?: string,

    /**
     * If set, any property with the specified prefix is considered a filter, 
     * and its trimmed prefix name is the field that the filter will apply on.
     * 
     * This option has lower priority than 'filterSuffix' option. If filterSuffix is set, this option is ignored.
     * 
     * Either this option or 'filterSuffix' option must be set.
     */
    filterPrefix?: string,

    /**
     * Field name mapped from filter fields and orderBy fields to actual model's fields.
     */
    fieldAlias?: Record<string, string>,
}

export type AutoQueryModel = {
    [property: string]: boolean | AutoQueryModel
}

export interface OrderByOptions {
    fieldMap?: Record<string, string>,
    ignoreUnmapped?: boolean,
}