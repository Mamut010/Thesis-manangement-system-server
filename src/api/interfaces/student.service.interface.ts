import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";
import { RequestStateInfoDto } from "../../shared/dtos";
import { StudentMaintainerServiceInterface } from "./student-maintainer.service.interface";

export interface StudentServiceInterface extends StudentMaintainerServiceInterface {
    createThesisRequest(userId: string, request: ThesisRequestCreateRequest): Promise<RequestStateInfoDto>;
    getCreatedRequestState(userId: string): Promise<RequestStateInfoDto>;
}