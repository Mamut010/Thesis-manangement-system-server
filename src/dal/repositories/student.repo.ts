import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { StudentUpdateRequest } from "../../contracts/requests/student-update.request";
import { StudentInfoDto } from "../../shared/dtos";
import { userInclude } from "../constants/includes";
import { anyChanges } from "../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { PlainTransformerInterface } from "../../shared/utils/plain-transformer";
import { StudentRepoInterface } from "../interfaces";
import { StudentsQueryRequest } from "../../contracts/requests/students-query.request";
import { StudentsQueryResponse } from "../../contracts/responses/students-query.response";
import { AutoQueryCreatable, PrismaQueryCreatorInterface } from "../../lib/query";
import { Student, User } from "../../core/models";

@injectable()
export class StudentRepo implements StudentRepoInterface {
    constructor(
        @inject(INJECTION_TOKENS.Prisma) private prisma: PrismaClient,
        @inject(INJECTION_TOKENS.PrismaQueryCreator) private queryCreator: PrismaQueryCreatorInterface,
        @inject(INJECTION_TOKENS.PlainTransformer) private plainTransformer: PlainTransformerInterface) {

    }

    async query(queryRequest: StudentsQueryRequest): Promise<StudentsQueryResponse> {
        const prismaQuery = this.createPrismaQuery(queryRequest);

        const count = await this.prisma.student.count({ where: prismaQuery.where });
        const students = await this.prisma.student.findMany({
            ...prismaQuery,
            include: userInclude
        })

        const response = new StudentsQueryResponse();
        response.content = students.map(item => this.plainTransformer.toStudentInfo(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<StudentInfoDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toStudentInfo(record);
    }

    async update(id: string, updateRequest: StudentUpdateRequest): Promise<StudentInfoDto | null> {
        let record = await this.findRecordById(id);

        if (!record) {
            return null;
        }

        if (anyChanges(flattenObject(record), updateRequest)) {
            record = await this.prisma.student.update({
                where: {
                    userId: id
                },
                data: {
                    intake: updateRequest.intake,
                    ects: updateRequest.ects,
                    user: {
                        update: {
                            surname: updateRequest.surname,
                            forename: updateRequest.forename,
                            email: updateRequest.email,
                            signature: updateRequest.signature,
                        }
                    }
                },
                include: userInclude
            });
        }

        return this.plainTransformer.toStudentInfo(record);
    }

    private async findRecordById(id: string) {
        return await this.prisma.student.findUnique({
            where: {
                userId: id
            },
            include: userInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = {
            ...this.queryCreator.createQueryModel(Student),
            user: this.queryCreator.createQueryModel(User),
        };
        return this.queryCreator.createQueryObject(model, queryRequest, { fieldNameMap: { studentId: 'userId' } });
    }
}