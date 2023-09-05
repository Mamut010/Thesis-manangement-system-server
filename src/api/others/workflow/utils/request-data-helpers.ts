import { PrismaClientLike } from "../types/utility-types";

export function makeStoredDataValue(value: unknown): string {
    return JSON.stringify(value);
}

export function getOriginalDataValue<T = unknown>(value: string): T {
    return JSON.parse(value) as T;
}

export async function getRequestDataStringValueByKey(prisma: PrismaClientLike,requestId: string, key: string)
    : Promise<string | undefined> {
    const storedRequestData = await prisma.requestData.findUnique({
        where: {
            requestId_name: {
                requestId: requestId,
                name: key,
            }
        },
        select: {
            value: true,
        }
    });
    
    const originalDataValue = storedRequestData ? getOriginalDataValue(storedRequestData.value) : undefined;
    if (!storedRequestData || typeof originalDataValue !== 'string') {
        return undefined;
    }
    
    return originalDataValue;
}