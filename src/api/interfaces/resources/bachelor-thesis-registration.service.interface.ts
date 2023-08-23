import { BachelorThesisRegistrationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationInfosQueryResponse } from "../../../contracts/responses/api/bachelor-thesis-registration-infos-query.response";
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