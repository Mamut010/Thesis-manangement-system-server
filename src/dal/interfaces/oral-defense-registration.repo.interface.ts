import { 
    OralDefenseRegistrationCreateRequest,
    OralDefenseRegistrationUpdateRequest, 
    OralDefenseRegistrationsQueryRequest
} from "../../contracts/requests";
import { OralDefenseRegistrationsQueryResponse } from "../../contracts/responses";
import { OralDefenseRegistrationDto } from "../../shared/dtos";

export interface OralDefenseRegistrationRepoInterface {
    query(queryRequest: OralDefenseRegistrationsQueryRequest): Promise<OralDefenseRegistrationsQueryResponse>;

    findOneById(id: number): Promise<OralDefenseRegistrationDto | null>;

    create(createRequest: OralDefenseRegistrationCreateRequest): Promise<OralDefenseRegistrationDto>;

    update(id: number, updateRequest: OralDefenseRegistrationUpdateRequest): Promise<OralDefenseRegistrationDto | null>;

    delete(id: number): Promise<boolean>;

    queryLecturerAssets(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationsQueryResponse>;
}