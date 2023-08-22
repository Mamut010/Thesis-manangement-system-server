/* eslint-disable @typescript-eslint/no-unsafe-return */

import { injectable } from "inversify";
import { BinaryFilter } from "./interfaces/binary-filter";
import { OrderBy } from "./order-by";
import { PrismaQueryCreatorInterface } from "./interfaces/prisma-query-creator.interface";
import { getActualOperatorFromNotOperator, isFilterActualOperator, isNullableOperator } from "./utils/operator-helpers";
import { Pagination } from "./pagination";
import { ListFilter } from "./interfaces/list-filter";
import { FilterActualOperator, FilterOperator } from "./types/filter-operator";
import { AutoQueryCreatable, AutoQueryCreationOptions, AutoQueryModel, AutoWhereQueryCreatable, OrderByOptions } from "./types/query-creator-utility";
import { ConcreteBinaryFilter, ConcreteListFilter } from "./types/concrete-filter";
import { assignObjectByDotNotation, createObjectByDotNotation, defaultOrGiven, flipMap, isEnumerableObject, singleOrArrayOrUndefined } from "../../utils/object-helpers";
import { trimPrefix, trimSuffix } from "../../utils/string-helpers";
import { isBinaryFilter, isBinaryFilterArray, isListFilter, isListFilterArray } from "./utils/filter-helpers";
import { 
    ActualFilteringObject,
    ActualListFilteringObject,
    NullableFilteringObject,
    OrderByQueryObject, 
    PaginationQueryObject, 
    PrismaQueryObject, 
    WhereBinaryFilterObject, 
    WhereListFilterObject, 
    WhereQueryObject 
} from "./types/query-object";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { InternalServerError } from "../../contracts/errors/internal-server.error";
import { mergeRecordsOfArray } from "./utils/record-helpers";

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

    createFilteringObject<TValue, TOperator extends FilterOperator = FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : WhereBinaryFilterObject<TValue, TOperator> | undefined {
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
            } as any;
        }

        // Type guard used here so type-checker won't complain
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
        const options = defaultOrGiven(defaultOptions, orderByOptions, { skipNestedEnumeration: true });

        if (Array.isArray(orderBy)) {
            const orderBys = orderBy
                    .map(item => this.constructOrderBySingle(item, options))
                    .filter((item): item is NonNullable<typeof item> => typeof item !== 'undefined');
            return singleOrArrayOrUndefined(orderBys);
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
        let binaryFilters: BinaryAndListFilters['binaryFilters']= {};
        let listFilters: BinaryAndListFilters['listFilters'] = {};

        for(const key in query) {
            const value: unknown = query[key];
            const isValueBinaryFilter = isBinaryFilter(value);
            const isValueBinaryFilterArray = isBinaryFilterArray(value);
            const isValueListFilter = isListFilter(value);
            const isValueListFilterArray = isListFilterArray(value);

            if (!isValueBinaryFilter 
                && !isValueBinaryFilterArray
                && !isValueListFilter 
                && !isValueListFilterArray
                && isEnumerableObject(value)) {
                const inner = this.getFilterFieldsFromQuery(value, creationOptions); 
                binaryFilters = mergeRecordsOfArray(inner.binaryFilters, binaryFilters);
                listFilters = mergeRecordsOfArray(inner.listFilters, listFilters);
                continue;
            }

            const field = this.getFieldNameFromKey(key, creationOptions);
            if (!field) {
                continue;
            }

            const finalFieldName = creationOptions.fieldNameMap?.[field] ?? field;
            if (isValueBinaryFilter) {
                binaryFilters[finalFieldName] = [value];
            }
            else if (isValueBinaryFilterArray) {
                binaryFilters[finalFieldName] = value;
            }
            else if (isValueListFilter) {
                listFilters[finalFieldName] = [value];
            }
            else if (isValueListFilterArray) {
                listFilters[finalFieldName] = value;
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

        const options = defaultOrGiven(defaultOptions, creationOptions, { skipNestedEnumeration: true });
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
                this.addFilteringObjectsToWhereByKey(binaryAndListFilters, where, key, value);
            });
        // Added all supplied field map to the generated field map
        Object
            .assign(generatedFieldMap, fieldMap);
    }

    private addFilteringObjectsToWhereByKey(binaryAndListFilters: BinaryAndListFilters, where: WhereQueryObject, 
        key: string, dotNotation: string) {
        let filteringObjects: unknown[] | undefined = undefined;
        let isBinary = false;
        let isList = false;
        if(binaryAndListFilters.binaryFilters[key]) {
            filteringObjects = binaryAndListFilters.binaryFilters[key]
                .map(filter => this.createFilteringObject<unknown>(filter));
            isBinary = true;
        }
        else if(binaryAndListFilters.listFilters[key]) {
            filteringObjects = binaryAndListFilters.listFilters[key]
                .map(filter => this.createListFilteringObject<unknown>(filter));
            isList = true;
        }

        if (!filteringObjects){
            return;
        }

        this.addFilteringObjectsToWhere(filteringObjects, where, dotNotation);
        // Delete so later call to this key does not add any more filtering objects with the same key
        if (isBinary) {
            delete binaryAndListFilters.binaryFilters[key];
        }
        else if (isList) {
            delete binaryAndListFilters.listFilters[key];
        }
    }

    private addFilteringObjectsToWhere<T>(filteringObjects: T[], where: WhereQueryObject, dotNotation: string) {
        const nonUndefinedFilteringObjects = filteringObjects
            .filter((item): item is NonNullable<typeof item> => typeof item !== 'undefined');
        
        if (nonUndefinedFilteringObjects.length > 1) {
            const OR = nonUndefinedFilteringObjects
                .map(item => createObjectByDotNotation(dotNotation, item))
                .reduce((pre: typeof filteringObject[], filteringObject) => {
                    pre.push(filteringObject);
                    return pre;
                }, []);
            this.addORToWhere(where, OR);
        }
        else if (nonUndefinedFilteringObjects.length === 1) {
            assignObjectByDotNotation(where, dotNotation, nonUndefinedFilteringObjects[0]);
        }
    }

    private addORToWhere(where: WhereQueryObject, ORValue: WhereQueryObject[]) {
        const currentOR = where.OR;
        const currentAND = where.AND;
        const newInnerWhere = { OR: ORValue };
        if (currentAND) {
            currentAND.push(newInnerWhere);
        }
        else if (currentOR) {
            const currentInnerWhere = { OR: currentOR }; 
            where.AND = [currentInnerWhere, newInnerWhere];
            delete where.OR;
        }
        else {
            where.OR = ORValue;
        }
    }

    private mergeWhere(where1: WhereQueryObject, where2: WhereQueryObject) {
        const {AND, OR, ...props} = { ...where1, ...where2 };
        const where: WhereQueryObject = props;
        
        if (where1.AND) {
            if (where2.AND) {
                where1.AND.push(...where2.AND);
            }
            else if (where2.OR) {
                this.addORToWhere(where1, where2.OR);
            }
            where.AND = where1.AND;
        }
        else if (where1.OR) {
            // If where2 has at least an OR, or better, an AND
            if (where2.AND || where2.OR) {
                this.addORToWhere(where2, where1.OR);
                // After where1.OR is added to where2, it should now have an AND
                where.AND = where2.AND;
            }
            // Otherwise
            else {
                // Just keep where1.OR
                where.OR = where1.OR;
            }
        }
        else {
            if (where2.AND) {
                where.AND = where2.AND;
            }
            else if (where2.OR) {
                where.OR = where2.OR;
            }
        }

        return where;
    }

    private finalizeWhere(where: WhereQueryObject): WhereQueryObject | undefined {
        return Object.keys(where).length > 0 ? where : undefined;
    }

    private constructActualWhereWithFieldMap<T extends AutoQueryModel>(model: T, query: AutoWhereQueryCreatable, 
        binaryAndListFilters: BinaryAndListFilters, creationOptions: AutoQueryCreationOptions): WhereWithFieldMap {
        const initialConfig: WhereObjectCreationConfig = {
            fieldNamePrefix: '',
            reversedFieldNameMap: creationOptions.fieldNameMap ? flipMap(creationOptions.fieldNameMap) : undefined,
        };
        return this.constructActualWhereWithFieldMapImpl(model, query, binaryAndListFilters, creationOptions, initialConfig);
    }

    private constructActualWhereWithFieldMapImpl<T extends AutoQueryModel>(model: T, query: AutoWhereQueryCreatable, 
        binaryAndListFilters: BinaryAndListFilters, creationOptions: AutoQueryCreationOptions, 
        config: WhereObjectCreationConfig): WhereWithFieldMap {
        let where: WhereQueryObject = {};
        let fieldMap: Record<string, string> = {};

        for(const key in model) {
            const value = model[key];
            if (!value) {
                continue;
            }
            else if (isEnumerableObject(value)) {
                const innerConfig: WhereObjectCreationConfig = { 
                    ...config,
                    fieldNamePrefix: config.fieldNamePrefix + key + PrismaQueryCreator.DOT 
                };
                const inner = this.constructActualWhereWithFieldMapImpl(value, query, binaryAndListFilters, creationOptions, 
                    innerConfig);
                where = this.mergeWhere(where, inner.where);
                fieldMap = { ...fieldMap, ...inner.fieldMap };
                continue;
            }

            const currentDotNotation = config.fieldNamePrefix + key;
            this.addFilteringObjectsToWhereByKey(binaryAndListFilters, where, key, currentDotNotation);
            fieldMap[config.reversedFieldNameMap?.[key] ?? key] = currentDotNotation;
        }

        return {
            where,
            fieldMap,
        }
    }

    private constructActualFilteringObject<TValue, TOperator extends FilterActualOperator>
        (binaryFilter: BinaryFilter<TValue, TOperator>): ActualFilteringObject<TValue, TOperator> {
        return this.handleNullableOperator(binaryFilter) ?? 
            {
                [binaryFilter.operator]: binaryFilter.value
            } as any;
    }

    private constructActualListFilteringObject<TValue>(listFilter: ListFilter<TValue>): ActualListFilteringObject<TValue[]> {
        return this.handleNullableOperator(listFilter) ?? 
            {
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

    private handleNullableOperator<T>(filter: (T extends { operator: unknown } ? T : never))
        : NullableFilteringObject | undefined {
        if (isNullableOperator(filter.operator)) {
            return {
                equals: null
            };
        }
    }
}

// Utility interfaces
interface BinaryAndListFilters {
    binaryFilters: Record<string, ConcreteBinaryFilter[]>,
    listFilters: Record<string, ConcreteListFilter[]>
}

interface WhereWithFieldMap {
    where: WhereQueryObject,
    fieldMap: Record<string, string>,
}

interface WhereObjectCreationConfig {
    fieldNamePrefix: string,
    reversedFieldNameMap?: Record<string, string>,
}