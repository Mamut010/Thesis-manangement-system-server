/**
 * Prisma Client (Query Engine)
 */
const PRISMA_CLIENT_ERROR_CODES = {
    /**
     * Unique constraint failed on the {constraint}
     */
    UniqueConstraintFailed: 'P2002'
} as const;

/**
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference
 */
export const PRISMA_ERROR_CODES = {
    ...PRISMA_CLIENT_ERROR_CODES
} as const;