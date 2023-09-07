import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { LecturerRepoInterface } from "../../dal/interfaces";
import { AssetsServiceInterface, LecturerServiceInterface } from "../interfaces";
import { MapperServiceInterface } from "../../shared/interfaces";
import { LecturerMaintainerService } from "./lecturer-maintainer.service";

@injectable()
export class LecturerService extends LecturerMaintainerService implements LecturerServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.LecturerRepo) lecturerRepo: LecturerRepoInterface,
        @inject(INJECTION_TOKENS.AssetsService) assetsService: AssetsServiceInterface,
        @inject(INJECTION_TOKENS.MapperService) mapper: MapperServiceInterface) {
        super(lecturerRepo, assetsService, mapper);
    }
}