import { LocationCreateRequest } from "../../../contracts/requests/resources/location-create.request";
import { LocationUpdateRequest } from "../../../contracts/requests/resources/location-update.request";
import { LocationsQueryRequest } from "../../../contracts/requests/resources/locations-query.request";
import { LocationsQueryResponse } from "../../../contracts/responses/resources/locations-query.response";
import { LocationDto } from "../../../shared/dtos";

export interface LocationServiceInterface {
    getLocations(queryRequest: LocationsQueryRequest) : Promise<LocationsQueryResponse>;
    getLocation(id: number): Promise<LocationDto>;
    createLocation(createRequest: LocationCreateRequest): Promise<LocationDto>;
    updateLocation(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto>;
    deleteLocation(id: number): Promise<void>;
}