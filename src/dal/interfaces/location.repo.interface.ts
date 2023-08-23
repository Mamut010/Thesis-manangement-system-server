import { LocationCreateRequest } from "../../contracts/requests";
import { LocationUpdateRequest } from "../../contracts/requests";
import { LocationsQueryRequest } from "../../contracts/requests";
import { LocationsQueryResponse } from "../../contracts/responses";
import { LocationDto } from "../../shared/dtos";

export interface LocationRepoInterface {
    query(queryRequest: LocationsQueryRequest): Promise<LocationsQueryResponse>;

    findOneById(id: number): Promise<LocationDto | null>;

    create(createRequest: LocationCreateRequest): Promise<LocationDto>;

    update(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto | null>;

    delete(id: number): Promise<boolean>;
}