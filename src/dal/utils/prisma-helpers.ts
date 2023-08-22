import { Prisma } from "@prisma/client";
import { PRISMA_ERROR_CODES } from "../../core/constants/prisma-error-codes";
import { ConflictError } from "../../contracts/errors/conflict.error";

export const wrapUniqueConstraint = <T>(fn: () => T, errMsg?: string): T => {
    try {
        return fn();
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