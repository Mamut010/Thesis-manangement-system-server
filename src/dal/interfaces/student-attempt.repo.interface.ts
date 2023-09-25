import { StudentAttemptCreateRequest, StudentAttemptUpdateRequest } from "../../contracts/requests";
import { StudentAttemptDto } from "../../shared/dtos";

export interface StudentAttemptRepoInterface {
    findOneById(id: string): Promise<StudentAttemptDto | null>;

    findOneByStudentIdAndAttempt(studentId: string, attempt: number): Promise<StudentAttemptDto | null>;

    findOneByRequestId(requestId: string): Promise<StudentAttemptDto | null>;

    findManyByStudentId(studentId: string): Promise<StudentAttemptDto[]>;

    create(createRequest: StudentAttemptCreateRequest): Promise<StudentAttemptDto>;

    update(id: string, updateRequest: StudentAttemptUpdateRequest): Promise<StudentAttemptDto | null>;

    updateByStudentIdAndAttempt(studentId: string, attempt: number, updateRequest: StudentAttemptUpdateRequest)
        : Promise<StudentAttemptDto | null>;

    delete(id: string): Promise<boolean>;

    deleteByStudentIdAndAttempt(studentId: string, attempt: number): Promise<boolean>;
}