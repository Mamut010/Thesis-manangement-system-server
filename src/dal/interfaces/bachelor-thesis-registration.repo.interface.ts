import { BachelorThesisRegistrationCreateRequest } from "../../contracts/requests/resources/bachelor-thesis-registration-create.request";
import { BachelorThesisRegistrationUpdateRequest } from "../../contracts/requests/resources/bachelor-thesis-registration-update.request";
import { BachelorThesisRegistrationsQueryRequest } from "../../contracts/requests/resources/bachelor-thesis-registrations-query.request";
import { BachelorThesisRegistrationsQueryResponse } from "../../contracts/responses/resources/bachelor-thesis-registrations-query.response";
import { BachelorThesisRegistrationDto } from "../../shared/dtos";

export interface BachelorThesisRegistrationRepoInterface {
    query(queryRequest: BachelorThesisRegistrationsQueryRequest): Promise<BachelorThesisRegistrationsQueryResponse>;

    findOneById(id: number): Promise<BachelorThesisRegistrationDto | null>;

    create(createRequest: BachelorThesisRegistrationCreateRequest): Promise<BachelorThesisRegistrationDto>;

    update(id: number, updateRequest: BachelorThesisRegistrationUpdateRequest): Promise<BachelorThesisRegistrationDto | null>;

    delete(id: number): Promise<void>;

    queryLecturerAssets(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]>;
}