import { ThesisInfoDto } from "../../shared/dtos";

export interface AdminThesisServiceInterface {
    getThesisInfo(thesisId: number): Promise<ThesisInfoDto>
}