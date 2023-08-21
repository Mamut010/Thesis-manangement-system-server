import { PrismaQueryObject } from "../../lib/query";
import { bachelorThesisAndOralDefenseInclude } from "../../shared/constants/includes";

export function getLecturerAssetsQuery(lecturerId: string, prismaQuery: PrismaQueryObject) {
    return {
        where: {
            AND: [
                {
                    OR: [
                        {
                            supervisor1Id: lecturerId,
                        },
                        {
                            supervisor2Id: lecturerId,
                        }
                    ]
                },
                prismaQuery.where ?? {}
            ],
        },
        include: bachelorThesisAndOralDefenseInclude,
        orderBy: prismaQuery.orderBy,
        skip: prismaQuery.skip,
        take: prismaQuery.take,
    }
}