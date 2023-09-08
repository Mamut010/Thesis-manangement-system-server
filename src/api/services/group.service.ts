import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { GroupServiceInterface } from "../interfaces";
import { GroupInfosQueryRequest, GroupInfoCreateRequest, GroupInfoUpdateRequest } from "../../contracts/requests";
import { GroupInfosQueryResponse } from "../../contracts/responses";
import { GroupInfoDto } from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { GroupRepoInterface, ProcessRepoInterface } from "../../dal/interfaces";
import { MapperServiceInterface } from "../../shared/interfaces"
import { getThesisProcessOrThrow } from "../../utils/process-helpers";

@injectable()
export class GroupService implements GroupServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.GroupRepo) private groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.ProcessRepo) private processRepo: ProcessRepoInterface,
        @inject(INJECTION_TOKENS.MapperService) private mapper: MapperServiceInterface) {

    }

    async getGroups(queryRequest: GroupInfosQueryRequest): Promise<GroupInfosQueryResponse> {
        const result = await this.groupRepo.query(queryRequest);
        return {
            content: result.content.map(item => this.mapper.map(GroupInfoDto, item)),
            count: result.count
        }
    }

    async getGroup(id: string): Promise<GroupInfoDto> {
        const result = await this.ensureRecordExists(id);
        return this.mapper.map(GroupInfoDto, result);
    }

    async createThesisProcessGroup(createRequest: GroupInfoCreateRequest): Promise<GroupInfoDto> {
        const process = await getThesisProcessOrThrow(this.processRepo);
        const result = await this.groupRepo.create({
            ...createRequest,
            processId: process.id
        });
        
        return this.mapper.map(GroupInfoDto, result);
    }

    async updateGroup(id: string, updateRequest: GroupInfoUpdateRequest): Promise<GroupInfoDto> {
        const result = await this.groupRepo.update(id, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }

        return this.mapper.map(GroupInfoDto, result);
    }

    async deleteGroup(id: string): Promise<void> {
        const deleted = await this.groupRepo.delete(id);
        if (!deleted) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }
    }

    private async ensureRecordExists(id: string) {
        const result = await this.groupRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }
        return result;
    }
}