import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { LocationServiceInterface } from "../../interfaces";
import { LocationsQueryRequest } from "../../../contracts/requests/resources/locations-query.request";
import { LocationsQueryResponse } from "../../../contracts/responses/resources/locations-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { LocationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { LocationCreateRequest } from "../../../contracts/requests/resources/location-create.request";
import { LocationUpdateRequest } from "../../../contracts/requests/resources/location-update.request";
import { Location } from "../../../core/models";
import { PlainTransformerInterface } from "../../../shared/utils/plain-transformer";
import { anyChanges } from "../../../utils/crud-helpers";

@injectable()
export class LocationService implements LocationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getLocations(queryRequest: LocationsQueryRequest): Promise<LocationsQueryResponse> {
        const model = this.queryCreator.createQueryModel(Location);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest);

        const count = await this.prisma.location.count({ where: prismaQuery.where });
        const locations = await this.prisma.location.findMany(prismaQuery);

        const response = new LocationsQueryResponse();
        response.content = locations.map(item => this.plainTransformer.toLocation(item));
        response.count = count;
        return response;
    }

    async getLocation(id: number): Promise<LocationDto> {
        const location = await this.ensureRecordExists(id);
        return this.plainTransformer.toLocation(location);
    }

    async createLocation(createRequest: LocationCreateRequest): Promise<LocationDto> {
        const location = await this.prisma.location.create({
            data: createRequest
        });
        return this.plainTransformer.toLocation(location);
    }

    async updateLocation(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto> {
        let record = await this.ensureRecordExists(id);
        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.location.update({
                where: {
                    id: id
                },
                data: updateRequest
            });
        }

        return this.plainTransformer.toLocation(record);
    }

    async deleteLocation(id: number): Promise<void> {
        await this.ensureRecordExists(id);

        await this.prisma.location.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.location.findUniqueOrThrow({
                where: {
                    id: id
            }});
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.LocationNotFound);
        }
    }
}