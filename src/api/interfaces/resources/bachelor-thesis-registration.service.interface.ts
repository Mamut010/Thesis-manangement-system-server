import { 
    BachelorThesisRegistrationCreateRequest,
    BachelorThesisRegistrationUpdateRequest,
    BachelorThesisRegistrationsQueryRequest
} from "../../../contracts/requests";
import { BachelorThesisRegistrationInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisRegistrationInfoDto } from "../../../shared/dtos";

export interface BachelorThesisRegistrationServiceInterface {
    getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationInfosQueryResponse>;

    getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationInfoDto>;

    createBachelorThesisRegistration(user: AuthorizedUser, createRequest: BachelorThesisRegistrationCreateRequest)
        : Promise<BachelorThesisRegistrationInfoDto>;

    updateBachelorThesisRegistration(user: AuthorizedUser, id: number, updateRequest: BachelorThesisRegistrationUpdateRequest)
        : Promise<BachelorThesisRegistrationInfoDto>;
        
    deleteBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<void>;
}