import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { BachelorThesisRegistrationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { BachelorThesisRegistrationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { BachelorThesisRegistrationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { PlainTransformerInterface } from "../../utils/plain-transformer";
import { BachelorThesisRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisRegistration } from "../../../core/models";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { PlainBachelorThesisRegistration } from "../../../shared/types/plain-types";
import { anyChanges } from "../../../utils/crud-helpers";
import { bachelorThesisAndOralDefenseInclude } from "../../constants/includes";

@injectable()
export class BachelorThesisRegistrationService implements BachelorThesisRegistrationServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationsQueryResponse> {
        const fieldMap = {
            surname: 'student.user.surname',
            forename: 'student.user.forename',
            thesisTitle: 'thesis.title',
            supervisor1Title: 'supervisor1.title',
            supervisor2Title: 'supervisor2.title',
        };
        const model = this.queryCreator.createQueryModel(BachelorThesisRegistration);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });

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

    async getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationDto> {
        const bachelorThesisRegistration = await this.ensureRecordExists(id);
        return this.plainTransformer.toBachelorThesisRegistration(bachelorThesisRegistration);
    }

    async createBachelorThesisRegistration(user: AuthorizedUser, createRequest: BachelorThesisRegistrationCreateRequest)
        : Promise<BachelorThesisRegistrationDto> {
        const bachelorThesisRegistration = await this.prisma.bachelorThesisRegistration.create({
            data: createRequest,
            include:  bachelorThesisAndOralDefenseInclude
        });
        return this.plainTransformer.toBachelorThesisRegistration(bachelorThesisRegistration);
    }

    async updateBachelorThesisRegistration(user: AuthorizedUser, id: number, 
        updateRequest: BachelorThesisRegistrationUpdateRequest) : Promise<BachelorThesisRegistrationDto> {
        let record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

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

    async deleteBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.prisma.bachelorThesisRegistration.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.bachelorThesisRegistration.findUniqueOrThrow({
                where: {
                    id: id
                },
                include:  bachelorThesisAndOralDefenseInclude
            });
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.BachelorThesisRegistrationNotFound);
        }
    }

    private ensureValidModification(user: AuthorizedUser, record: PlainBachelorThesisRegistration) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.BachelorThesisRegistrationDenied);
        }
    }
}