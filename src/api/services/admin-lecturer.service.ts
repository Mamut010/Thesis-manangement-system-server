import { inject, injectable } from "inversify";
import { AdminLecturerServiceInterface, AssetsServiceInterface } from "../interfaces";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { LecturerInfoDto } from "../../shared/dtos";
import { LecturerInfosQueryRequest } from "../../contracts/requests";
import { LecturerRepoInterface } from "../../dal/interfaces";
import { LecturerInfosQueryResponse } from "../../contracts/responses";
import { MapperServiceInterface } from "../../shared/interfaces";
import { LecturerMaintainerService } from "./lecturer-maintainer.service";

@injectable()
export class AdminLecturerService extends LecturerMaintainerService implements AdminLecturerServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.LecturerRepo) lecturerRepo: LecturerRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.MapperService) mapper: MapperServiceInterface) {
        super(lecturerRepo, assetsService, mapper);
    }

    async getLecturers(lecturersQuery: LecturerInfosQueryRequest): Promise<LecturerInfosQueryResponse> {
        const result = await this.lecturerRepo.query(lecturersQuery);
        return {
            content: this.mapper.map(LecturerInfoDto, result.content),
            count: result.count,
        }
    }
}