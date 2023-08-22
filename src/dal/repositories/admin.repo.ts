import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { AdminInfoDto } from "../../shared/dtos";
import { userInclude } from "../constants/includes";
import { anyChanges } from "../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { AdminRepoInterface } from "../interfaces";
import { AdminUpdateRequest } from "../../contracts/requests/admin-update.request";

@injectable()
export class AdminRepo implements AdminRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async findOneById(id: string): Promise<AdminInfoDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toAdminInfo(record);
    }

    async update(id: string, updateRequest: AdminUpdateRequest): Promise<AdminInfoDto | null> {
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
                            signature: updateRequest.signature
                        }
                    }
                },
                include: userInclude
            });
        }

        return this.plainTransformer.toAdminInfo(record);
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