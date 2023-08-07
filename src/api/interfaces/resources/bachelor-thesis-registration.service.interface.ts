import { BachelorThesisRegistrationCreateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationsQueryResponse } from "../../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { BachelorThesisRegistrationDto } from "../../../shared/dtos";

export interface BachelorThesisRegistrationServiceInterface {
    getBachelorThesisRegistrations(user: AuthorizedUser, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationsQueryResponse>;

    getBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<BachelorThesisRegistrationDto>;

    createBachelorThesisRegistration(user: AuthorizedUser, createRequest: BachelorThesisRegistrationCreateRequest)
        : Promise<BachelorThesisRegistrationDto>;

    updateBachelorThesisRegistration(user: AuthorizedUser, id: number, updateRequest: BachelorThesisRegistrationUpdateRequest)
        : Promise<BachelorThesisRegistrationDto>;
        
    deleteBachelorThesisRegistration(user: AuthorizedUser, id: number): Promise<void>;
}