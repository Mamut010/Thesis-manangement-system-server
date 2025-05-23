import { OrderBy } from "../order-by";
import { Pagination } from "../pagination";

export type AutoQueryCreatable = {
    [key: string]: any,
    pagination?: Pagination,
    orderBy?: OrderBy | OrderBy[],
}

export type AutoWhereQueryCreatable = Omit<AutoQueryCreatable, 'pagination' | 'orderBy'>;

export type AutoQueryCreationOptions = {
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
    fieldNameMap?: Record<string, string>,

    /**
     * User supplied field map to override the auto generated field map while analyzing the structure of the model.
     * 
     * Takes the form of: 
     *
     *      <#Field name>: <Dot notation of actual value>
     * 
     * @Note This may cause run time error if the dot notations are supplied incorrectly as the QueryCreator does not check
     * for usage correctness.
     */
    fieldMap?: Record<string, string>,

    /**
     * Fields that are passed directly as the <skippedFields> option used when creating OrderByQueryObject
     */
    orderBySkippedFields?: string[],
}

export type AutoQueryModel = {
    [property: string]: boolean | AutoQueryModel
}

export type OrderByOptions = {
    fieldMap?: Record<string, string>,
    skippedFields?: string[],
    skipUnmapped?: boolean,
}