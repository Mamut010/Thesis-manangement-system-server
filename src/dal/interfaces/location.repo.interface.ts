import { LocationCreateRequest } from "../../contracts/requests/resources/location-create.request";
import { LocationUpdateRequest } from "../../contracts/requests/resources/location-update.request";
import { LocationsQueryRequest } from "../../contracts/requests/resources/locations-query.request";
import { LocationsQueryResponse } from "../../contracts/responses/resources/locations-query.response";
import { LocationDto } from "../../shared/dtos";

export interface LocationRepoInterface {
    query(queryRequest: LocationsQueryRequest): Promise<LocationsQueryResponse>;

    findOneById(id: number): Promise<LocationDto | null>;

    create(createRequest: LocationCreateRequest): Promise<LocationDto>;

    update(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto | null>;

    delete(id: number): Promise<boolean>;
}