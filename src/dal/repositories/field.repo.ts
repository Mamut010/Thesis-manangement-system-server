import { inject, injectable } from "inversify";
import { FieldRepoInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { FieldsQueryRequest } from "../../contracts/requests/resources/fields-query.request";
import { FieldsQueryResponse } from "../../contracts/responses/resources/fields-query.response";
import { Field } from "../../core/models";
import { FieldDto } from "../../shared/dtos";
import { FieldCreateRequest } from "../../contracts/requests/resources/field-create.request";
import { FieldUpdateRequest } from "../../contracts/requests/resources/field-update.request";
import { anyChanges } from "../utils/crud-helpers";

@injectable()
export class FieldRepo implements FieldRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: FieldsQueryRequest): Promise<FieldsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.field.count({ where: prismaQuery.where });
        const fields = await this.prisma.field.findMany(prismaQuery);

        const response = new FieldsQueryResponse();
        response.content = fields.map(item => this.plainTransformer.toField(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<FieldDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toField(record);
    }

    async create(createRequest: FieldCreateRequest): Promise<FieldDto> {
        const record = await this.prisma.field.create({
            data: createRequest
        });
        return this.plainTransformer.toField(record);
    }

    async update(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto | null> {
        let record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        if (anyChanges(record, updateRequest)) {
            record = await this.prisma.field.update({
                where: {
                    id: id
                },
                data: updateRequest
            });
        }

        return this.plainTransformer.toField(record);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.field.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    private async findRecordById(id: number) {
        return await this.prisma.field.findUnique({
            where: {
                id: id
            },
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = this.queryCreator.createQueryModel(Field);
        return this.queryCreator.createQueryObject(model, queryRequest);
    }
}