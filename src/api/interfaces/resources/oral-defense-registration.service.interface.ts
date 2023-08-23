import { 
    OralDefenseRegistrationCreateRequest,
    OralDefenseRegistrationUpdateRequest,
    OralDefenseRegistrationsQueryRequest
} from "../../../contracts/requests";
import { OralDefenseRegistrationInfosQueryResponse } from "../../../contracts/responses";
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