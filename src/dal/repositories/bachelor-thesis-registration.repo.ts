import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { BachelorThesisRegistration } from "../../core/models";
import { bachelorThesisAndOralDefenseInclude } from "../constants/includes";
import { BachelorThesisRegistrationDto } from "../../shared/dtos";
import { BachelorThesisRegistrationCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { anyChanges } from "../utils/crud-helpers";
import { wrapUniqueConstraint } from "../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BachelorThesisRegistrationRepoInterface } from "../interfaces";
import { getLecturerAssetsQuery } from "../utils/lecturer-assets-helpers";

@injectable()
export class BachelorThesisRegistrationRepo implements BachelorThesisRegistrationRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async query(queryRequest: BachelorThesisRegistrationsQueryRequest): Promise<BachelorThesisRegistrationsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.bachelorThesisRegistration.count({ where: prismaQuery.where });
        const records = await this.prisma.bachelorThesisRegistration.findMany({
            ...prismaQuery,
            include:  bachelorThesisAndOralDefenseInclude,
        });

        const response = new BachelorThesisRegistrationsQueryResponse();
        response.content = records.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
        response.count = count;
        return response;
    }

    async findOneById(id: number): Promise<BachelorThesisRegistrationDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }
        return this.plainTransformer.toBachelorThesisRegistration(record);
    }

    async create(createRequest: BachelorThesisRegistrationCreateRequest): Promise<BachelorThesisRegistrationDto> {
        const impl = async () => {
            const record = await this.prisma.bachelorThesisRegistration.create({
                data: createRequest,
                include:  bachelorThesisAndOralDefenseInclude
            });
            return this.plainTransformer.toBachelorThesisRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisRegistration);
    }

    async update(id: number, updateRequest: BachelorThesisRegistrationUpdateRequest)
        : Promise<BachelorThesisRegistrationDto | null> {
        const impl = async () => {
            let record = await this.findRecordById(id);
            if (!record) {
                return null;
            }

            if (anyChanges(record, updateRequest)) {
                record = await this.prisma.bachelorThesisRegistration.update({
                    where: {
                        id: id
                    },
                    data: updateRequest,
                    include:  bachelorThesisAndOralDefenseInclude
                });
            }
    
            return this.plainTransformer.toBachelorThesisRegistration(record);
        }

        return wrapUniqueConstraint(impl, ERROR_MESSAGES.UniqueConstraint.StudentAlreadyConnectedBachelorThesisRegistration);
    }

    async delete(id: number): Promise<boolean> {
        const { count } = await this.prisma.bachelorThesisRegistration.deleteMany({
            where: {
                id: id
            }
        });
        return count > 0;
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]> {
        const prismaQuery = this.createPrismaQuery(queryRequest);
        const records = await this.prisma.bachelorThesisRegistration.findMany(getLecturerAssetsQuery(lecturerId, prismaQuery));
        return records.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
    }
    
    private async findRecordById(id: number) {
        return await this.prisma.bachelorThesisRegistration.findUnique({
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
        const model = this.queryCreator.createQueryModel(BachelorThesisRegistration);
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });
    }
}