import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { OralDefenseRegistrationsQueryRequest } from "../../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationsQueryResponse } from "../../../contracts/responses/resources/oral-defense-registrations-query.response";
import { PrismaQueryCreatorInterface } from "../../../lib/query";
import { OralDefenseRegistrationDto } from "../../../shared/dtos";
import { NotFoundError } from "../../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../../contracts/constants/error-messages";
import { OralDefenseRegistrationCreateRequest } from "../../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../../contracts/requests/resources/oral-defense-registration-update.request";
import { PlainTransformerInterface } from "../../utils/plain-transformer";
import { compareObjectByEntries, isObjectEmptyOrAllUndefined } from "../../../utils/object-helpers";
import { OralDefenseRegistrationServiceInterface } from "../../interfaces";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseRegistration } from "../../../core/models";
import { ForbiddenError } from "../../../contracts/errors/forbidden.error";
import { PlainOralDefenseRegistration } from "../../../shared/types/plain-types";

@injectable()
export class OralDefenseRegistrationService implements OralDefenseRegistrationServiceInterface {
    private static readonly include = {
        student: {
            include: {
                user: true
            }
        },
        supervisor1: true,
        supervisor2: true
    } as const;
    
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface
    ) {

    }

    async getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationsQueryResponse> {
        const fieldMap = {
            surname: 'student.user.surname',
            forename: 'student.user.forename',
            supervisor1Title: 'supervisor1.title',
            supervisor2Title: 'supervisor2.title',
        };
        const model = this.queryCreator.createQueryModel(OralDefenseRegistration);
        const prismaQuery = this.queryCreator.createQueryObject(model, queryRequest, { fieldMap });

        const count = await this.prisma.oralDefenseRegistration.count({ where: prismaQuery.where });
        const oralDefenseRegistrations = await this.prisma.oralDefenseRegistration.findMany({
            ...prismaQuery,
            include: OralDefenseRegistrationService.include,
        });

        const response = new OralDefenseRegistrationsQueryResponse();
        response.content = oralDefenseRegistrations.map(item => this.plainTransformer.toOralDefenseRegistration(item));
        response.count = count;
        return response;
    }

    async getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationDto> {
        const oralDefenseRegistration = await this.ensureRecordExists(id);
        return this.plainTransformer.toOralDefenseRegistration(oralDefenseRegistration);
    }

    async createOralDefenseRegistration(user: AuthorizedUser, createRequest: OralDefenseRegistrationCreateRequest)
        : Promise<OralDefenseRegistrationDto> {
        const oralDefenseRegistration = await this.prisma.oralDefenseRegistration.create({
            data: createRequest,
            include: OralDefenseRegistrationService.include
        });
        return this.plainTransformer.toOralDefenseRegistration(oralDefenseRegistration);
    }

    async updateOralDefenseRegistration(user: AuthorizedUser, id: number, 
        updateRequest: OralDefenseRegistrationUpdateRequest) : Promise<OralDefenseRegistrationDto> {
        let record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        if (!isObjectEmptyOrAllUndefined(updateRequest) && !compareObjectByEntries(record, updateRequest)) {
            record = await this.prisma.oralDefenseRegistration.update({
                where: {
                    id: id
                },
                data: updateRequest,
                include: OralDefenseRegistrationService.include
            });
        }

        return this.plainTransformer.toOralDefenseRegistration(record);
    }

    async deleteOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<void> {
        const record = await this.ensureRecordExists(id);
        this.ensureValidModification(user, record);

        await this.prisma.oralDefenseRegistration.delete({
            where: {
                id: id
            }
        });
    }

    private async ensureRecordExists(id: number) {
        try {
            return await this.prisma.oralDefenseRegistration.findUniqueOrThrow({
                where: {
                    id: id
                },
                include: OralDefenseRegistrationService.include
            });
        }
        catch {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.OralDefenseRegistrationNotFound);
        }
    }

    private ensureValidModification(user: AuthorizedUser, record: PlainOralDefenseRegistration) {
        const isValid = true;
        if (!isValid) {
            throw new ForbiddenError(ERROR_MESSAGES.Forbidden.OralDefenseRegistrationDenied);
        }
    }
}