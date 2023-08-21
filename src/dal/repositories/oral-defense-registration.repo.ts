import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationsQueryResponse } from "../../contracts/responses/resources/oral-defense-registrations-query.response";
import { OralDefenseRegistration } from "../../core/models";
import { bachelorThesisAndOralDefenseInclude } from "../constants/includes";
import { OralDefenseRegistrationDto } from "../../shared/dtos";
import { OralDefenseRegistrationCreateRequest } from "../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../contracts/requests/resources/oral-defense-registration-update.request";
import { anyChanges } from "../../utils/crud-helpers";
import { wrapUniqueConstraint } from "../../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { OralDefenseRegistrationRepoInterface } from "../interfaces";
import { getLecturerAssetsQuery } from "../utils/lecturer-assets-helpers";

@injectable()
export class OralDefenseRegistrationRepo implements OralDefenseRegistrationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: OralDefenseRegistrationsQueryRequest): Promise<OralDefenseRegistrationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.oralDefenseRegistration.count({ where: prismaQuery.where });
        const records = await this.prisma.oralDefenseRegistration.findMany({
            ...prismaQuery,
            include:  bachelorThesisAndOralDefenseInclude,
        });

        const response = new OralDefenseRegistrationsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toOralDefenseRegistration(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<OralDefenseRegistrationDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toOralDefenseRegistration(record);
    }

    async create(createRequest: OralDefenseRegistrationCreateRequest): Promise<OralDefenseRegistrationDto> {
        const impl = async () => {
            const record = await this.prisma.oralDefenseRegistration.create({
                data: createRequest,
                include:  bachelorThesisAndOralDefenseInclude
            });
            return this.plainTransformer.toOralDefenseRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedOralDefenseRegistration);
    }

    async update(id: number, updateRequest: OralDefenseRegistrationUpdateRequest)
        : Promise<OralDefenseRegistrationDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.oralDefenseRegistration.update({
                    where: {
                        id: id
                    },
                    data: updateRequest,
                    include:  bachelorThesisAndOralDefenseInclude
                });
            }
    
            return this.plainTransformer.toOralDefenseRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedOralDefenseRegistration);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.oralDefenseRegistration.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        const records = await this.prisma.oralDefenseRegistration.findMany(getLecturerAssetsQuery(lecturerId, prismaQuery));
        return records.map(item => this.plainTransformer.toOralDefenseRegistration(item));
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.oralDefenseRegistration.findUnique({
            where: {
                id: id
            },
            include:  bachelorThesisAndOralDefenseInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const fieldMap = {
            surname: 'student.user.surname',
            forename: 'student.user.forename',
            thesisTitle: 'thesis.title',
            supervisor1Title: 'supervisor1.title',
            supervisor2Title: 'supervisor2.title',
        };
        const model = this.queryCreator.createQueryModel(OralDefenseRegistration);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}