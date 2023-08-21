import { inject, injectable } from "inversify";
import { LocationRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { LocationsQueryRequest } from "../../contracts/requests/resources/locations-query.request";
import { LocationsQueryResponse } from "../../contracts/responses/resources/locations-query.response";
import { Location } from "../../core/models";
import { LocationDto } from "../../shared/dtos";
import { LocationCreateRequest } from "../../contracts/requests/resources/location-create.request";
import { LocationUpdateRequest } from "../../contracts/requests/resources/location-update.request";
import { anyChanges } from "../../utils/crud-helpers";

@injectable()
export class LocationRepo implements LocationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: LocationsQueryRequest): Promise<LocationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.location.count({ where: prismaQuery.where });
        const locations = await this.prisma.location.findMany(prismaQuery);

        const response = new LocationsQueryResponse();
        response.content = locations.map(item => this.plainTransformer.toLocation(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<LocationDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toLocation(record);
    }

    async create(createRequest: LocationCreateRequest): Promise<LocationDto> {
        const record = await this.prisma.location.create({
            data: createRequest
        });
        return this.plainTransformer.toLocation(record);
    }

    async update(id: number, updateRequest: LocationUpdateRequest): Promise<LocationDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

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

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.location.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: number) {
        return await this.prisma.location.findUnique({
            where: {
                id: id
            },
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Location);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}