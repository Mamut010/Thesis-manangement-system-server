import { LocationCreateRequest, LocationUpdateRequest, LocationsQueryRequest } from "../../../contracts/requests";
import { LocationsQueryResponse } from "../../../contracts/responses";
import { LocationDto } from "../../../shared/dtos";

export interface LocationServiceInterface {
    getLocations(queryRequest: LocationsQueryRequest) : Promise<LocationsQueryResponse>;
    getLocation(id: number): Promise<LocationDto>;
    createLocation(createRequest: LocationCreateRequest): Promise<LocationDto>;
    updateLocation(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto>;
    deleteLocation(id: number): Promise<void>;
}