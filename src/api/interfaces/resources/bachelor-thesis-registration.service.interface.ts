import {
    BachelorThesisRegistrationInfoUpdateRequest,
    BachelorThesisRegistrationInfosQueryRequest,
} from "../../../contracts/requests";
import { BachelorThesisRegistrationInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisRegistrationInfoDto } from "../../../shared/dtos";

export interface BachelorThesisRegistrationServiceInterface {
    getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationInfosQueryRequest)
        : Promise<BachelorThesisRegistrationInfosQueryResponse>;

    getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationInfoDto>;

    updateBachelorThesisRegistration(user: AuthorizedUser, id: number, updateRequest: BachelorThesisRegistrationInfoUpdateRequest)
        : Promise<BachelorThesisRegistrationInfoDto>;
        
    deleteBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<void>;
}