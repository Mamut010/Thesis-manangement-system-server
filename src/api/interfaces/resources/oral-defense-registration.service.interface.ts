import { OralDefenseRegistrationCreateRequest } from "../../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../../contracts/requests/resources/oral-defense-registration-update.request";
import { OralDefenseRegistrationsQueryRequest } from "../../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationInfosQueryResponse } from "../../../contracts/responses/api/oral-defense-registration-infos-query.response";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseRegistrationInfoDto } from "../../../shared/dtos";

export interface OralDefenseRegistrationServiceInterface {
    getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationInfosQueryResponse>;

    getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationInfoDto>;

    createOralDefenseRegistration(user: AuthorizedUser, createRequest: OralDefenseRegistrationCreateRequest)
        : Promise<OralDefenseRegistrationInfoDto>;

    updateOralDefenseRegistration(user: AuthorizedUser, id: number, updateRequest: OralDefenseRegistrationUpdateRequest)
        : Promise<OralDefenseRegistrationInfoDto>;
        
    deleteOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<void>;
}