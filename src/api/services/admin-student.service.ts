import { inject, injectable } from "inversify";
import { AdminStudentServiceInterface, AssetsServiceInterface } from "../interfaces";
import { StudentInfosQueryResponse } from "../../contracts/responses";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { StudentInfoDto } from "../../shared/dtos";
import { StudentRepoInterface } from "../../dal/interfaces";
import { StudentInfosQueryRequest } from "../../contracts/requests";
import { MapperServiceInterface } from "../../shared/interfaces";
import { StudentMaintainerService } from "./student-maintainer.service";

@injectable()
export class AdminStudentService extends StudentMaintainerService implements AdminStudentServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.StudentRepo) studentRepo: StudentRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.MapperService) mapper: MapperServiceInterface) {
        super(studentRepo, assetsService, mapper);
    }

    async getStudents(studentsQuery: StudentInfosQueryRequest): Promise<StudentInfosQueryResponse> {
        const result = await this.studentRepo.query(studentsQuery);
        return {
            content: this.mapper.map(StudentInfoDto, result.content),
            count: result.count
        }
    }
}