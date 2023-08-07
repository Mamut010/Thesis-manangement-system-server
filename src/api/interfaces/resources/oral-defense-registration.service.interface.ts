import { OralDefenseRegistrationCreateRequest } from "../../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../../contracts/requests/resources/oral-defense-registration-update.request";
import { OralDefenseRegistrationsQueryRequest } from "../../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationsQueryResponse } from "../../../contracts/responses/resources/oral-defense-registrations-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseRegistrationDto } from "../../../shared/dtos";

export interface OralDefenseRegistrationServiceInterface {
    getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationsQueryResponse>;

    getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationDto>;

    createOralDefenseRegistration(user: AuthorizedUser, createRequest: OralDefenseRegistrationCreateRequest)
        : Promise<OralDefenseRegistrationDto>;

    updateOralDefenseRegistration(user: AuthorizedUser, id: number, updateRequest: OralDefenseRegistrationUpdateRequest)
        : Promise<OralDefenseRegistrationDto>;
        
    deleteOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<void>;
}