import { ThesisRequestCreateRequest } from "../../contracts/requests/api/thesis-request-create.request";
import { RequestStateInfoDto } from "../../shared/dtos";

export interface StudentServiceInterface {
    createThesisRequest(userId: string, request: ThesisRequestCreateRequest): Promise<RequestStateInfoDto | undefined>;
}