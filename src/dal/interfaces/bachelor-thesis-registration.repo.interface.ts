import { 
    BachelorThesisRegistrationCreateRequest,
    BachelorThesisRegistrationUpdateRequest,
    BachelorThesisRegistrationsQueryRequest
} from "../../contracts/requests";
import { BachelorThesisRegistrationsQueryResponse } from "../../contracts/responses";
import { BachelorThesisRegistrationDto } from "../../shared/dtos";

export interface BachelorThesisRegistrationRepoInterface {
    query(queryRequest: BachelorThesisRegistrationsQueryRequest): Promise<BachelorThesisRegistrationsQueryResponse>;

    findOneById(id: number): Promise<BachelorThesisRegistrationDto | null>;

    create(createRequest: BachelorThesisRegistrationCreateRequest): Promise<BachelorThesisRegistrationDto>;

    update(id: number, updateRequest: BachelorThesisRegistrationUpdateRequest): Promise<BachelorThesisRegistrationDto | null>;

    delete(id: number): Promise<boolean>;

    queryLecturerAssets(lecturerId: string, queryRequest: BachelorThesisRegistrationsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]>;
}