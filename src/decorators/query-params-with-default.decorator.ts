import { QueryParams } from "routing-controllers"

export const QueryParamsWithDefault = () => {
    return QueryParams({ transform: { exposeDefaultValues: true } });
}