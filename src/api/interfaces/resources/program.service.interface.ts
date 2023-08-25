import { ProgramCreateRequest, ProgramUpdateRequest, ProgramsQueryRequest } from "../../../contracts/requests";
import { ProgramsQueryResponse } from "../../../contracts/responses";
import { ProgramDto } from "../../../shared/dtos";

export interface ProgramServiceInterface {
    getPrograms(queryRequest: ProgramsQueryRequest) : Promise<ProgramsQueryResponse>;
    getProgram(id: number): Promise<ProgramDto>;
    createProgram(createRequest: ProgramCreateRequest): Promise<ProgramDto>;
    updateProgram(id: number, updateRequest: ProgramUpdateRequest): Promise<ProgramDto>;
    deleteProgram(id: number): Promise<void>;
}