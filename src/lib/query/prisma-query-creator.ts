/* eslint-disable @typescript-eslint/no-unsafe-return */

import { injectable } from "inversify";
import { BinaryFilter } from "./interfaces/binary-filter";
import { OrderBy } from "./order-by";
import { PrismaQueryCreatorInterface } from "./interfaces/prisma-query-creator.interface";
import { getActualOperatorFromNotOperator, isFilterActualOperator } from "./utils/operator-helpers";
import { Pagination } from "./pagination";
import { ListFilter } from "./interfaces/list-filter";
import { FilterActualOperator, FilterOperator } from "./types/filter-operator";
import { AutoQueryCreatable, AutoQueryCreationOptions, AutoQueryModel, AutoWhereQueryCreatable, OrderByOptions } from "./types/query-creator-utility";
import { ConcreteBinaryFilter, ConcreteListFilter } from "./types/concrete-filter";
import { assignObjectByDotNotation, createObjectByDotNotation, defaultOrGiven, flipMap, isEnumerableObject } from "../../utils/object-helpers";
import { trimPrefix, trimSuffix } from "../../utils/string-helpers";
import { isBinaryFilter, isListFilter } from "./utils/filter-helper";
import { 
    ActualFilteringObject,
    OrderByQueryObject, 
    PaginationQueryObject, 
    PrismaQueryObject, 
    WhereBinaryFilterObject, 
    WhereListFilterObject, 
    WhereQueryObject 
} from "./types/query-object";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { InternalServerError } from "../../contracts/errors/internal-server.error";

@injectable()
export class PrismaQueryCreator implements PrismaQueryCreatorInterface {
    private static readonly DOT = '.';

    createQueryModel<T extends object>(cls: ClassConstructor<T>): AutoQueryModel {
        return Object.fromEntries(
            Object.keys(plainToInstance(cls, {})).map(key => [key, true])
        );
    }   

    createQueryObject<T extends AutoQueryModel>(model: T, query: AutoQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : PrismaQueryObject {
        const { where, fieldMap } = this.createWhereWithFieldMap(model, query, creationOptions);
        const orderBy = this.createOrderByObject(query.orderBy, { fieldMap, ignoreUnmapped: true });
        const { skip, take } = this.createPaginationObject(query.pagination);

        return {
            where: this.finalizeWhere(where),
            orderBy,
            skip,
            take,
        }
    }

    createWhereObject<T extends AutoQueryModel>(model: T, query: AutoWhereQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : WhereQueryObject | undefined {
        const { where } = this.createWhereWithFieldMap(model, query, creationOptions);
        return this.finalizeWhere(where);
    }

    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : WhereBinaryFilterObject<TValue> | undefined {
        // Deal with undefined filter
        if (!binaryFilter) {
            return;
        }

        // Deal with 'not' operator
        const actualOperator = getActualOperatorFromNotOperator(binaryFilter.operator);
        // If there is a 'not' operator, actual operator would be not undefined
        if (actualOperator) {
            return {
                not: this.constructActualFilteringObject({
                    value: binaryFilter.value,
                    operator: actualOperator
                })
            };
        }

        // Type guard used here so compiler won't complain
        if (isFilterActualOperator(binaryFilter.operator)) {
            return this.constructActualFilteringObject({
                value: binaryFilter.value,
                operator: binaryFilter.operator,
            });
        }
    }

    createListFilteringObject<TValue>(listFilter?: ListFilter<TValue>)
        : WhereListFilterObject<TValue> | undefined {
        return listFilter ? this.constructActualListFilteringObject(listFilter) : undefined;
    }

    createOrderByObject(orderBy?: OrderBy | OrderBy[], orderByOptions?: OrderByOptions)
        : OrderByQueryObject | OrderByQueryObject[] | undefined {  
        if (!orderBy) {
            return undefined;
        }
        const defaultOptions: OrderByOptions = {
            fieldMap: undefined,
            ignoreUnmapped: false,
        }
        const options = defaultOrGiven(defaultOptions, orderByOptions, { skipNestedEnumeration: ['fieldMap'] });

        if (Array.isArray(orderBy)) {
            const orderBys = orderBy
                    .map(item => this.constructOrderBySingle(item, options))
                    .filter((item): item is OrderByQueryObject => typeof item !== 'undefined');
            return orderBys.length > 0 ? orderBys : undefined;
        }
        else {
            return this.constructOrderBySingle(orderBy, options);
        }
    }

    createPaginationObject(pagination?: Pagination)
        : PaginationQueryObject {
        return {
            skip: pagination?.skip,
            take: pagination?.take,
        }
    }

    private getFilterFieldsFromQuery(query: AutoQueryCreatable, creationOptions: AutoQueryCreationOptions)
        : BinaryAndListFilters {
        let binaryFilters: Record<string, ConcreteBinaryFilter> = {};
        let listFilters: Record<string, ConcreteListFilter> = {};

        for(const key in query) {
            const value: unknown = query[key];
            const isValueBinaryFilter = isBinaryFilter(value);
            const isValueListFilter = isListFilter(value);

            if (!isValueBinaryFilter && !isValueListFilter && isEnumerableObject(value)) {
                const inner = this.getFilterFieldsFromQuery(value, creationOptions); 
                binaryFilters = { ...inner.binaryFilters, ...binaryFilters };
                listFilters = { ...inner.listFilters, ...listFilters };
                continue;
            }

            const field = this.getFieldNameFromKey(key, creationOptions);
            if (!field) {
                continue;
            }

            const mappedFieldName = creationOptions.fieldNameMap?.[field];
            if (isValueBinaryFilter) {
                binaryFilters[mappedFieldName ?? field] = value;
            }
            else if (isValueListFilter) {
                listFilters[mappedFieldName ?? field] = value;
            }
        }

        return {
            binaryFilters,
            listFilters
        }
    }

    private getFieldNameFromKey(key: string, creationOptions: AutoQueryCreationOptions) {
        if (creationOptions.filterSuffix && key.endsWith(creationOptions.filterSuffix)) {
            return trimSuffix(key, creationOptions.filterSuffix);
        }
        else if (creationOptions.filterPrefix && key.startsWith(creationOptions.filterPrefix)) {
            return trimPrefix(key, creationOptions.filterPrefix);
        }
    }

    private createWhereWithFieldMap<T extends AutoQueryModel>(model: T, query: AutoWhereQueryCreatable, 
        creationOptions?: AutoQueryCreationOptions) : WhereWithFieldMap {
        const defaultOptions: AutoQueryCreationOptions = {
            filterSuffix: 'Filter',
            filterPrefix: undefined,
            fieldNameMap: undefined,
            fieldMap: undefined,
        };

        const options = defaultOrGiven(defaultOptions, creationOptions, { skipNestedEnumeration: ['fieldMap'] });
        if (!options.filterSuffix && !options.filterPrefix) {
            throw new InternalServerError('Either a filter suffix or prefix must be specified for auto query creation process');
        }
        
        const binaryAndListFilters = this.getFilterFieldsFromQuery(query, options);
        const { where, fieldMap } = this.constructActualWhereWithFieldMap(model, query, binaryAndListFilters, options);
        if (options.fieldMap) {
            this.handleUserSuppliedFieldMap(options.fieldMap, binaryAndListFilters, where, fieldMap);
        }
        return {
            where,
            fieldMap
        }
    }

    private handleUserSuppliedFieldMap(fieldMap: Record<string, string>, binaryAndListFilters: BinaryAndListFilters,
        where: WhereQueryObject, generatedFieldMap: Record<string, string>) {
        // Added <key>-<value> of <filter's name>-<dot notation> pairs to where object.
        // Warning: This may cause run time error if the dot notations are used incorrectly
        Object
            .entries(fieldMap)
            .forEach(([key, value]) => {
                this.addFilteringObjectToWhereByKey(binaryAndListFilters, where, key, value);
            });
        // Added all supplied field map to the generated field map
        Object
            .assign(generatedFieldMap, fieldMap);
    }

    private addFilteringObjectToWhereByKey(binaryAndListFilters: BinaryAndListFilters, where: WhereQueryObject, 
        key: string, dotNotation: string) {
        if(binaryAndListFilters.binaryFilters[key]) {
            const filteringObject = this.createFilteringObject<unknown, FilterOperator>(binaryAndListFilters.binaryFilters[key]);
            if (filteringObject) {
                assignObjectByDotNotation(where, dotNotation, filteringObject);
            }
            delete binaryAndListFilters.binaryFilters[key];
        }
        else if(binaryAndListFilters.listFilters[key]) {
            const filteringObject = this.createListFilteringObject<unknown>(binaryAndListFilters.listFilters[key]);
            if (filteringObject) {
                assignObjectByDotNotation(where, dotNotation, filteringObject);
            }
            delete binaryAndListFilters.listFilters[key];
        }
    }

    private finalizeWhere(where: WhereQueryObject): WhereQueryObject | undefined {
        return Object.keys(where).length > 0 ? where : undefined;
    }

    private constructActualWhereWithFieldMap<T>(model: T, query: AutoWhereQueryCreatable, binaryAndListFilters: BinaryAndListFilters, 
        creationOptions: AutoQueryCreationOptions): WhereWithFieldMap {
        const initialConfig: WhereObjectCreationConfig = {
            fieldNamePrefix: '',
            reversedFieldNameMap: creationOptions.fieldNameMap ? flipMap(creationOptions.fieldNameMap) : undefined,
        };
        return this.constructActualWhereWithFieldMapImpl(model, query, binaryAndListFilters, creationOptions, initialConfig);
    }

    private constructActualWhereWithFieldMapImpl<T>(model: T, query: AutoWhereQueryCreatable, binaryAndListFilters: BinaryAndListFilters, 
        creationOptions: AutoQueryCreationOptions, config: WhereObjectCreationConfig): WhereWithFieldMap {
        let where: WhereQueryObject = {};
        let fieldMap: Record<string, string> = {};

        for(const key in model) {
            const value = model[key];
            if (isEnumerableObject(value)) {
                const innerConfig: WhereObjectCreationConfig = { 
                    ...config,
                    fieldNamePrefix: config.fieldNamePrefix + key + PrismaQueryCreator.DOT 
                };
                const inner = this.constructActualWhereWithFieldMapImpl(value, query, binaryAndListFilters, creationOptions, 
                    innerConfig);
                where = { ...inner.where, ...where };
                fieldMap = { ...inner.fieldMap, ...fieldMap };
                continue;
            }

            const currentDotNotation = config.fieldNamePrefix + key;
            this.addFilteringObjectToWhereByKey(binaryAndListFilters, where, key, currentDotNotation);
            fieldMap[config.reversedFieldNameMap?.[key] ?? key] = currentDotNotation;
        }

        return {
            where,
            fieldMap,
        }
    }

    private constructActualFilteringObject<TValue, TOperator extends FilterActualOperator>
        (binaryFilter: BinaryFilter<TValue, TOperator>): ActualFilteringObject<TValue> {
        return {
            [binaryFilter.operator]: binaryFilter.value
        } as any;
    }

    private constructActualListFilteringObject<TValue>(listFilter: ListFilter<TValue>): ActualFilteringObject<TValue[]> {
        return {
            [listFilter.operator]: listFilter.value
        } as any;
    }

    private constructOrderBySingle(orderBy: OrderBy, orderByOptions: OrderByOptions): OrderByQueryObject | undefined {
        const actualLocation = orderByOptions.fieldMap?.[orderBy.field];
        if (!orderByOptions.ignoreUnmapped) {
            const simpleOrderBy = {
                [orderBy.field]: orderBy.dir
            };
            return actualLocation ? createObjectByDotNotation(actualLocation, orderBy.dir) : simpleOrderBy;
        }
        else {
            return actualLocation ? createObjectByDotNotation(actualLocation, orderBy.dir) : undefined;
        }
    }
}

// Utility interfaces
interface BinaryAndListFilters {
    binaryFilters: Record<string, ConcreteBinaryFilter>,
    listFilters: Record<string, ConcreteListFilter>
}

interface WhereWithFieldMap {
    where: WhereQueryObject,
    fieldMap: Record<string, string>,
}

interface WhereObjectCreationConfig {
    fieldNamePrefix: string,
    reversedFieldNameMap?: Record<string, string>,
}