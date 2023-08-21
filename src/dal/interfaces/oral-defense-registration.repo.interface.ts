import { OralDefenseRegistrationCreateRequest } from "../../contracts/requests/resources/oral-defense-registration-create.request";
import { OralDefenseRegistrationUpdateRequest } from "../../contracts/requests/resources/oral-defense-registration-update.request";
import { OralDefenseRegistrationsQueryRequest } from "../../contracts/requests/resources/oral-defense-registrations-query.request";
import { OralDefenseRegistrationsQueryResponse } from "../../contracts/responses/resources/oral-defense-registrations-query.response";
import { OralDefenseRegistrationDto } from "../../shared/dtos";

export interface OralDefenseRegistrationRepoInterface {
    query(queryRequest: OralDefenseRegistrationsQueryRequest): Promise<OralDefenseRegistrationsQueryResponse>;

    findOneById(id: number): Promise<OralDefenseRegistrationDto | null>;

    create(createRequest: OralDefenseRegistrationCreateRequest): Promise<OralDefenseRegistrationDto>;

    update(id: number, updateRequest: OralDefenseRegistrationUpdateRequest): Promise<OralDefenseRegistrationDto | null>;

    delete(id: number): Promise<boolean>;

    queryLecturerAssets(lecturerId: string, queryRequest: OralDefenseRegistrationsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]>;
}