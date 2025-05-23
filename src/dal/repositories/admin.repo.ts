import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { AdminDto } from "../../shared/dtos";
import { userInclude } from "../constants/includes";
import { anyChanges } from "../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AdminRepoInterface } from "../interfaces";
import { AdminUpdateRequest } from "../../contracts/requests";

@injectable()
export class AdminRepo implements AdminRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async findOneById(id: string): Promise<AdminDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toAdmin(record);
    }

    async update(id: string, updateRequest: AdminUpdateRequest): Promise<AdminDto | null> {
        let record = await this.findRecordById(id);

        if (!record) {
            return null;
        }

        if (anyChanges(flattenObject(record), updateRequest)) {
            record = await this.prisma.admin.update({
                where: {
                    userId: id
                },
                data: {
                    contact: updateRequest.contact,
                    user: {
                        update: {
                            email: updateRequest.email,
                        }
                    }
                },
                include: userInclude
            });
        }

        return this.plainTransformer.toAdmin(record);
    }

    private async findRecordById(id: string) {
        return await this.prisma.admin.findUnique({
            where: {
                userId: id
            },
            include: userInclude
        });
    }
}