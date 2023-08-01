import { injectable } from "inversify";
import { BinaryFilter } from "./interfaces/binary-filter";
import { OrderBy } from "./order-by";
import { PrismaQueryCreatorInterface } from "./interfaces/prisma-query-creater.interface";
import { FilterActualOperator, FilterOperator, SortDir } from "./types";
import { getActualOperatorFromNotOperator } from "./utils/operator-helpers";
import { Pagination } from "./pagination";
import { ListFilter } from "./interfaces/list-filter";
import { ListFilterOperator } from "./types/list-filter-operator";

@injectable()
export class PrismaQueryCreator implements PrismaQueryCreatorInterface {
    createFilteringObject<TValue, TOperator extends FilterOperator>(binaryFilter?: BinaryFilter<TValue, TOperator>)
        : Partial<Record<FilterActualOperator, TValue>> | { not: Partial<Record<FilterActualOperator, TValue>>; } | undefined {
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
        : Partial<Record<ListFilterOperator, TValue[]>> | undefined {
        if (!listFilter) {
            return;
        }

        return {
            [listFilter.operator]: listFilter.value
        }
    }

    createOrderByObject(orderBy?: OrderBy | OrderBy[])
        : { [key: string]: SortDir } | { [key: string]: SortDir }[] | undefined {
        if (!orderBy) {
            return undefined;
        }
        else if (Array.isArray(orderBy)) {
            return orderBy.map(item => this.constructOrderBySingle(item));
        }
        else {
            return this.constructOrderBySingle(orderBy);
        }
    }

    createPaginationObject(pagination?: Pagination)
        : { skip?: number, take?: number } {
        return {
            skip: pagination?.skip,
            take: pagination?.take,
        }
    }

    private constructActualFilteringObject<TValue, TOperator extends FilterOperator>
        (binaryFilter: BinaryFilter<TValue, TOperator>) : Partial<Record<FilterActualOperator, TValue>> {
        return {
            [binaryFilter.operator]: binaryFilter.value
        }
    }

    private constructOrderBySingle(orderBy: OrderBy) {
        return {
            [orderBy.field]: orderBy.dir
        }
    }
}