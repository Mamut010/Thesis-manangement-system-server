import {
    OralDefenseRegistrationInfoUpdateRequest,
    OralDefenseRegistrationInfosQueryRequest,
} from "../../../contracts/requests";
import { OralDefenseRegistrationInfosQueryResponse } from "../../../contracts/responses";
import { AuthorizedUser } from "../../../core/auth-checkers";
import { OralDefenseRegistrationInfoDto } from "../../../shared/dtos";

export interface OralDefenseRegistrationServiceInterface {
    getOralDefenseRegistrations(user: AuthorizedUser, queryRequest: OralDefenseRegistrationInfosQueryRequest)
        : Promise<OralDefenseRegistrationInfosQueryResponse>;

    getOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<OralDefenseRegistrationInfoDto>;

    updateOralDefenseRegistration(user: AuthorizedUser, id: number, updateRequest: OralDefenseRegistrationInfoUpdateRequest)
        : Promise<OralDefenseRegistrationInfoDto>;
        
    deleteOralDefenseRegistration(user: AuthorizedUser, id: number): Promise<void>;
}