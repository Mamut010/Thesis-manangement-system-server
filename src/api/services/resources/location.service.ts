import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { LocationServiceInterface } from "../../interfaces";
import { LocationsQueryRequest } from "../../../contracts/requests/resources/locations-query.request";
import { LocationsQueryResponse } from "../../../contracts/responses/resources/locations-query.response";
import { LocationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { LocationCreateRequest } from "../../../contracts/requests/resources/location-create.request";
import { LocationUpdateRequest } from "../../../contracts/requests/resources/location-update.request";
import { LocationRepoInterface } from "../../../dal/interfaces";

@injectable()
export class LocationService implements LocationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.LocationRepo) private locationRepo: LocationRepoInterface) {

    }

    async getLocations(queryRequest: LocationsQueryRequest): Promise<LocationsQueryResponse> {
        return await this.locationRepo.query(queryRequest);
    }

    async getLocation(id: number): Promise<LocationDto> {
        return await this.ensureRecordExists(id);
    }

    async createLocation(createRequest: LocationCreateRequest): Promise<LocationDto> {
        return await this.locationRepo.create(createRequest);
    }

    async updateLocation(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto> {
        const record = await this.locationRepo.update(id, updateRequest);
        if (!record) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LocationNotFound);
        }

        return record;
    }

    async deleteLocation(id: number): Promise<void> {
        await this.locationRepo.delete(id);
    }

    private async ensureRecordExists(id: number) {
        const result = await this.locationRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.FieldNotFound);
        }
        return result;
    }
}