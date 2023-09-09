import { Prisma } from "@prisma/client";
import { PRISMA_ERROR_CODES } from "../../core/constants/prisma-error-codes";
import { ConflictError } from "../../contracts/errors/conflict.error";

export const wrapUniqueConstraint = async <T>(fn: () => Promise<T>, errMsg?: string): Promise<T> => {
    try {
        return await fn();
    }
    catch(e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === PRISMA_ERROR_CODES.UniqueConstraintFailed) {
            throw new ConflictError(errMsg);
        }
        else {
            throw e;
        }
    }
}

export function createUserWhereUniqueInputs(userIds?: string[]): Prisma.UserWhereUniqueInput[] | undefined {
    return userIds?.map(userId => { return { userId } });
}