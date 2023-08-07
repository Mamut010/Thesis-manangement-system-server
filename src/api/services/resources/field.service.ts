import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { FieldServiceInterface } from "../../interfaces";
import { FieldsQueryRequest } from "../../../contracts/requests/resources/fields-query.request";
import { FieldsQueryResponse } from "../../../contracts/responses/resources/fields-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { FieldDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../core/constants/error-messages";
import { FieldCreateRequest } from "../../../contracts/requests/resources/field-create.request";
import { FieldUpdateRequest } from "../../../contracts/requests/resources/field-update.request";
import { Field } from "../../../core/models";
import { PlainTransformerInterface } from "../../utils/plain-transformer";

@injectable()
export class FieldService implements FieldServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getFields(queryRequest: FieldsQueryRequest): Promise<FieldsQueryResponse> {
        const model = this.queryCreator.createQueryModel(Field);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest);

        const count = await this.prisma.field.count({ ...prismaQuery, skip: undefined, take: undefined });
        const fields = await this.prisma.field.findMany(prismaQuery);

        const response = new FieldsQueryResponse();
        response.content = fields.map(item => this.plainTransformer.toField(item));
        response.count = count;
        return response;
    }

    async getField(id: number): Promise<FieldDto> {
        const field = await this.ensureRecordExists(id);
        return this.plainTransformer.toField(field);
    }

    async createField(createRequest: FieldCreateRequest): Promise<FieldDto> {
        const field = await this.prisma.field.create({
            data: createRequest
        });
        return this.plainTransformer.toField(field);
    }

    async updateField(id: number, updateRequest: FieldUpdateRequest): Promise<FieldDto> {
        await this.ensureRecordExists(id);

        const field = await this.prisma.field.update({
            where: {
                id: id
            },
            data: updateRequest
        });
        return this.plainTransformer.toField(field);
    }

    async deleteField(id: number): Promise<void> {
        await this.ensureRecordExists(id);

        await this.prisma.field.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.field.findUniqueOrThrow({
                where: {
                    id: id
            }});
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.FieldNotFound);
        }
    }
}