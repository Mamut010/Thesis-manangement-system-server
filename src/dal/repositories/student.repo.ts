import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { PrismaClient } from "@prisma/client";
import { StudentUpdateRequest, StudentsQueryRequest } from "../../contracts/requests";
import { StudentDto } from "../../shared/dtos";
import { studentInclude } from "../constants/includes";
import { anyChanges } from "../utils/crud-helpers";
import { flattenObject } from "../../utils/object-helpers";
import { PlainTransformerInterface } from "../utils/plain-transfomer";
import { StudentRepoInterface } from "../interfaces";
import { StudentsQueryResponse } from "../../contracts/responses";
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
            include: studentInclude
        })

        const response = new StudentsQueryResponse();
        response.content = students.map(item => this.plainTransformer.toStudentInfo(item));
        response.count = count;
        return response;
    }

    async findOneById(id: string): Promise<StudentDto | null> {
        const record = await this.findRecordById(id);
        if (!record) {
            return null;
        }

        return this.plainTransformer.toStudentInfo(record);
    }

    async update(id: string, updateRequest: StudentUpdateRequest): Promise<StudentDto | null> {
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
                    signature: updateRequest.signature,
                    surname: updateRequest.surname,
                    forename: updateRequest.forename,
                    user: updateRequest.email ? {
                        update: {
                            email: updateRequest.email,
                        }
                    } : undefined,
                    program: updateRequest.programId ? {
                        connect: {
                            id: updateRequest.programId
                        }
                    } : undefined
                },
                include: studentInclude
            });
        }

        return this.plainTransformer.toStudentInfo(record);
    }

    private async findRecordById(id: string) {
        return await this.prisma.student.findUnique({
            where: {
                userId: id
            },
            include: studentInclude
        });
    }

    private createPrismaQuery(queryRequest: AutoQueryCreatable) {
        const model = {
            ...this.queryCreator.createQueryModel(Student),
            user: this.queryCreator.createQueryModel(User),
        };
        const fieldMap = {
            programTitle: 'program.title'
        };
        return this.queryCreator.createQueryObject(model, queryRequest, { 
            fieldNameMap: { 
                studentId: 'userId' 
            },
            fieldMap,
        });
    }
}