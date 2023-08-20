import { inject, injectable } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { AutoQueryCreatable, PrismaQueryCreatorInterface, PrismaQueryObject } from "../../lib/query";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { BachelorThesisRegistration } from "../../core/models";
import { bachelorThesisAndOralDefenseInclude } from "../../shared/constants/includes";
import { BachelorThesisRegistrationDto } from "../../shared/dtos";
import { BachelorThesisRegistrationCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { anyChanges } from "../../utils/crud-helpers";
import { wrapUniqueConstraint } from "../../utils/prisma-helpers";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { BachelorThesisRegistrationRepoInterface } from "../interfaces";
import { LecturerAssetsQueryRequest } from "../../contracts/requests/lecturer-assets-query.request";

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
        const bachelorThesisRegistrations = await this.prisma.bachelorThesisRegistration.findMany({
            ...prismaQuery,
            include:  bachelorThesisAndOralDefenseInclude,
        });

        const response = new BachelorThesisRegistrationsQueryResponse();
        response.content = bachelorThesisRegistrations.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
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
            const bachelorThesisRegistration = await this.prisma.bachelorThesisRegistration.create({
                data: createRequest,
                include:  bachelorThesisAndOralDefenseInclude
            });
            return this.plainTransformer.toBachelorThesisRegistration(bachelorThesisRegistration);
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

    async delete(id: number): Promise<void> {
        await this.prisma.bachelorThesisRegistration.delete({
            where: {
                id: id
            }
        });
    }

    async queryLecturerAssets(lecturerId: string, queryRequest: LecturerAssetsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const bachelorThesisRegistrations = await this.prisma.bachelorThesisRegistration.findMany({
            where: {
                OR: [
                    {
                        supervisor1Id: lecturerId,
                    },
                    {
                        supervisor2Id: lecturerId,
                    }
                ]
            },
            include: bachelorThesisAndOralDefenseInclude,
            orderBy: prismaQuery.orderBy,
            skip: prismaQuery.skip,
            take: prismaQuery.take,
        });

        return bachelorThesisRegistrations.map(item => this.plainTransformer.toBachelorThesisRegistration(item));
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