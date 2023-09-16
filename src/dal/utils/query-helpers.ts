import { Student, StudentAttempt } from "../../core/models";
import { AutoQueryModel, PrismaQuery, PrismaQueryCreatorInterface } from "../../lib/query";
import { ClassConstructor } from "../../utils/types";

export function createLecturerAssetsQuery(lecturerId: string, prismaQuery: PrismaQuery) {
    return {
        where: {
            AND: [
                {
                    OR: [
                        {
                            studentAttempt: {
                                thesis: {
                                    creatorId: lecturerId
                                }
                            }
                        },
                        {
                            studentAttempt: {
                                supervisor2Id: lecturerId
                            }
                        }
                    ]
                },
                prismaQuery.where ?? {}
            ],
        },
        orderBy: prismaQuery.orderBy,
        skip: prismaQuery.skip,
        take: prismaQuery.take,
    }
}

export function createBachelorThesisOrOralDefenseQueryModel<T extends object>(cls: ClassConstructor<T>, 
    queryCreator: PrismaQueryCreatorInterface): AutoQueryModel {
    const srcModel = queryCreator.createQueryModel(cls);
    const studentAttemptModel = queryCreator.createQueryModel(StudentAttempt);
    const studentModel = queryCreator.createQueryModel(Student);

    return {
        ...srcModel,
        studentAttempt: {
            ...studentAttemptModel,
            student: studentModel,
        }
    };
}