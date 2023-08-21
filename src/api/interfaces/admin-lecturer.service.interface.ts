import { LecturerAssetsQueryRequest } from "../../contracts/requests/lecturer-assets-query.request";
import { LecturerUpdateRequest } from "../../contracts/requests/lecturer-update.request";
import { LecturersQueryRequest } from "../../contracts/requests/lecturers-query.request";
import { LecturerDetailResponse } from "../../contracts/responses/lecturer-info.response";
import { LecturersQueryResponse } from "../../contracts/responses/lecturers-query.response";
import { 
    BachelorThesisAssessmentDto, 
    BachelorThesisRegistrationDto, 
    LecturerInfoDto, 
    OralDefenseAssessmentDto, 
    OralDefenseRegistrationDto
} from "../../shared/dtos";

export interface AdminLecturerServiceInterface {
    getLecturers(lecturersQuery: LecturersQueryRequest): Promise<LecturersQueryResponse>;

    getLecturerInfo(lecturerId: string): Promise<LecturerInfoDto>;

    getLecturerDetail(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<LecturerDetailResponse>;

    getLecturerBachelorThesisRegistrations(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<BachelorThesisRegistrationDto[]>;

    getLecturerOralDefenseRegistrations(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<OralDefenseRegistrationDto[]>;

    getLecturerBachelorThesisAssessments(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<BachelorThesisAssessmentDto[]>;

    getLecturerOralDefenseAssessments(lecturerId: string, lecturerAssetsQueryRequest: LecturerAssetsQueryRequest)
        : Promise<OralDefenseAssessmentDto[]>;

    updateLecturerInfo(lecturerId: string, updateRequest: LecturerUpdateRequest): Promise<LecturerInfoDto>;
}