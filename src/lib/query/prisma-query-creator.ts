/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { injectable } from "inversify";
import { BinaryFilter } from "./interfaces/binary-filter";
import { OrderBy } from "./order-by";
import { PrismaQueryCreatorInterface } from "./interfaces/prisma-query-creator.interface";
import { getActualOperatorFromNotOperator } from "./utils/operator-helpers";
import { Pagination } from "./pagination";
import { ListFilter } from "./interfaces/list-filter";
import { FilterActualOperator, FilterOperator } from "./types/filter-operator";
import { AutoQueryCreatable, AutoQueryCreationOptions, AutoQueryModel } from "./types/auto-query";
import { ConcreteBinaryFilter, ConcreteListFilter } from "./types/concrete-filter";
import { assignObjectByDotNotation, createObjectByDotNotation, defaultOrGiven, flipMap, isEnumerableObject } from "../../utils/object-helpers";
import { trimPrefix, trimSuffix } from "../../utils/string-helpers";
import { isBinaryFilter, isListFilter } from "./utils/filter-helper";
import { 
    OrderByQueryObject, 
    PaginationQueryObject, 
    PrismaQueryObject, 
    WhereBinaryFilterObject, 
    WhereListFilterObject, 
    WhereQueryObject 
} from "./types/prisma-query-object";

@injectable()
export class PrismaQueryCreator implements PrismaQueryCreatorInterface {
    private static readonly DOT = '.';

    createQueryObject<T extends AutoQueryModel>(model: T, query: AutoQueryCreatable, creationOptions?: AutoQueryCreationOptions)
        : PrismaQueryObject {
        const defaultOptions: AutoQueryCreationOptions = {
            filterSuffix: 'Filter',
            filterPrefix: undefined,
            fieldAlias: undefined,
            skipOrderByCheck: undefined,
        };

        const options = defaultOrGiven(defaultOptions, creationOptions, { skipNestedEnumeration: ['fieldAlias'] });
        if (!options.filterSuffix && !options.filterPrefix) {
            throw new Error('Either a filter suffix or prefix must be specified for auto query creation process');
        }
        
        const binaryAndListFilters = this.getFilterFieldsFromQuery(query, options);
        const { where, fieldMap } = this.createWhereObjectWithFieldMap(model, query, binaryAndListFilters, options);
        
        let orderBy = this.createOrderByObject(query.orderBy, fieldMap);
        if (!options.skipOrderByCheck) {
            const dotNotatedFields = new Set(Object.values(fieldMap));
            orderBy = this.checkOrderByQueryObject(dotNotatedFields, orderBy);
        }

        const { skip, take } = this.createPaginationObject(query.pagination);
        return {
            where: Object.keys(where).length > 0 ? where : undefined,
            orderBy,
            skip,
            take,
        }
    }

    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : WhereBinaryFilterObject<TValue> | undefined {
        // Deal with undefined filter
        if (!binaryFilter) {
            return;
        }

        // Deal with 'not' operator
        const actualOperator = getActualOperatorFromNotOperator(binaryFilter.operator);
        // If 'not' operator
        if (actualOperator) {
            return {
                not: this.constructActualFilteringObject({
                    value: binaryFilter.value,
                    operator: actualOperator
                })
            };
        }
        // Else, process as usual
        else {
            return this.constructActualFilteringObject(binaryFilter);
        }
    }

    createListFilteringObject<TValue>(listFilter?: ListFilter<TValue>)
        : WhereListFilterObject<TValue> | undefined {
        if (!listFilter) {
            return;
        }

        return {
            [listFilter.operator]: listFilter.value
        }
    }

    createOrderByObject(orderBy?: OrderBy | OrderBy[], fieldMap?: Record<string, string>)
        : OrderByQueryObject | OrderByQueryObject[] | undefined {
        if (!orderBy) {
            return undefined;
        }
        else if (Array.isArray(orderBy)) {
            const orderBys = orderBy
                    .map(item => this.constructOrderBySingle(item, fieldMap))
                    .filter((item): item is OrderByQueryObject => typeof item !== 'undefined');
            return orderBys.length > 0 ? orderBys : undefined;
        }
        else {
            return this.constructOrderBySingle(orderBy, fieldMap);
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

            let field: string;
            if (creationOptions.filterSuffix && key.endsWith(creationOptions.filterSuffix)) {
                field = trimSuffix(key, creationOptions.filterSuffix);
            }
            else if (creationOptions.filterPrefix && key.startsWith(creationOptions.filterPrefix)) {
                field = trimPrefix(key, creationOptions.filterPrefix);
            }
            else {
                continue;
            }

            if (isValueBinaryFilter) {
                binaryFilters[creationOptions.fieldAlias?.[field] ?? field] = value;
            }
            else if (isValueListFilter) {
                listFilters[creationOptions.fieldAlias?.[field] ?? field] = value;
            }
        }

        return {
            binaryFilters,
            listFilters
        }
    }

    private createWhereObjectWithFieldMap<T>(model: T, query: AutoQueryCreatable, binaryAndListFilters: BinaryAndListFilters, 
        creationOptions: AutoQueryCreationOptions): WhereWithFieldMap {
        const initialConfig: WhereObjectCreationConfig = {
            fieldNamePrefix: '',
            reversedFieldMap: creationOptions.fieldAlias ? flipMap(creationOptions.fieldAlias) : undefined,
        };
        return this.createWhereObjectWithFieldMapImpl(model, query, binaryAndListFilters, creationOptions, initialConfig);
    }

    private createWhereObjectWithFieldMapImpl<T>(model: T, query: AutoQueryCreatable, binaryAndListFilters: BinaryAndListFilters, 
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
                const inner = this.createWhereObjectWithFieldMapImpl(value, query, binaryAndListFilters, creationOptions, innerConfig);
                where = { ...inner.where, ...where };
                fieldMap = { ...inner.fieldMap, ...fieldMap };
                continue;
            }

            if(binaryAndListFilters.binaryFilters[key]) {
                const filteringObject = this.createFilteringObject(binaryAndListFilters.binaryFilters[key] as any);
                if (filteringObject) {
                    assignObjectByDotNotation(where, config.fieldNamePrefix + key, filteringObject);
                }
                delete binaryAndListFilters.binaryFilters[key];
            }
            else if(binaryAndListFilters.listFilters[key]) {
                const filteringObject = this.createListFilteringObject(binaryAndListFilters.listFilters[key] as any);
                if (filteringObject) {
                    assignObjectByDotNotation(where, config.fieldNamePrefix + key, filteringObject);
                }
                delete binaryAndListFilters.listFilters[key];
            }

            fieldMap[config.reversedFieldMap?.[key] ?? key] = config.fieldNamePrefix + key;
        }

        return {
            where,
            fieldMap,
        }
    }

    private checkOrderByQueryObject(dotNotatedFields: Set<string>, orderBy?: OrderByQueryObject | OrderByQueryObject[])
        : OrderByQueryObject | OrderByQueryObject[] | undefined {
        if (!orderBy) {
            return undefined;
        }
        else if(Array.isArray(orderBy)) {
            const checkedOrderBys = orderBy
                    .map(item => this.checkOrderByQueryObjectSingle(dotNotatedFields, item))
                    .filter((item): item is OrderByQueryObject => typeof item !== 'undefined');
            return checkedOrderBys.length > 0 ? checkedOrderBys : undefined;
        }
        else {
            return this.checkOrderByQueryObjectSingle(dotNotatedFields, orderBy);
        }
    }

    private checkOrderByQueryObjectSingle(dotNotatedFields: Set<string>, orderBy: OrderByQueryObject)
        : OrderByQueryObject | undefined {
        let dotNotation = '';
        let current = orderBy;

        let isActualOrderBy = false; 
        while (!isActualOrderBy) {
            for(const key in current) {
                const value = current[key];
                if (typeof value !== 'string') {
                    current = value;
                    dotNotation += key + PrismaQueryCreator.DOT;
                }
                else {
                    dotNotation += key;
                    isActualOrderBy = true;
                    break;
                }
            }
        }

        return dotNotatedFields.has(dotNotation) ? orderBy : undefined;
    }

    private constructActualFilteringObject<TValue, TOperator extends FilterOperator>
        (binaryFilter: BinaryFilter<TValue, TOperator>) : Partial<Record<FilterActualOperator, TValue>> {
        return {
            [binaryFilter.operator]: binaryFilter.value
        }
    }

    private constructOrderBySingle(orderBy: OrderBy, fieldMap?: Record<string, string>): OrderByQueryObject {
        const actualLocation = fieldMap?.[orderBy.field];
        const simpleOrderBy = {
            [orderBy.field]: orderBy.dir
        };
        
        return actualLocation ? createObjectByDotNotation(actualLocation, orderBy.dir) : simpleOrderBy;
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
    reversedFieldMap?: Record<string, string>,
}