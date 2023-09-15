import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { GroupServiceInterface } from "../interfaces";
import { GroupInfosQueryRequest, GroupInfoCreateRequest, GroupInfoUpdateRequest, GroupMembersUpdateRequest } from "../../contracts/requests";
import { GroupInfosQueryResponse } from "../../contracts/responses";
import { GroupInfoDto, UserDto } from "../../shared/dtos";
import { NotFoundError } from "../../contracts/errors/not-found.error";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { GroupRepoInterface, ProcessRepoInterface, UserRepoInterface } from "../../dal/interfaces";
import { MapperServiceInterface } from "../../shared/interfaces"
import { getThesisProcessOrThrow } from "../../utils/process-helpers";
import { arrayUnion } from "../../utils/array-helpers";
import { Role } from "../../core/constants/roles";
import { BadRequestError } from "../../contracts/errors/bad-request.error";

@injectable()
export class GroupService implements GroupServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.GroupRepo) private groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.UserRepo) private userRepo: UserRepoInterface,
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

    async updateGroupMembers(id: string, updateRequest: GroupMembersUpdateRequest): Promise<GroupInfoDto> {
        const userIds = arrayUnion(updateRequest.addedUserIds ?? [], updateRequest.removedUserIds ?? [], true);
        // If no userId is provided, simply return the group info
        if (userIds.length === 0) {
            return await this.getGroup(id);
        }
        
        const users = await this.ensureUsersExist(userIds);
        this.ensureAdminUsers(users);

        const result = await this.groupRepo.updateMembers(id, updateRequest);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }

        return result;
    }
        
    async setGroupMembers(id: string, userIds: string[]): Promise<GroupInfoDto> {
        const users = await this.ensureUsersExist(userIds);
        this.ensureAdminUsers(users);

        const result = await this.groupRepo.setMembers(id, userIds);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }

        return result;
    }

    private async ensureRecordExists(id: string) {
        const result = await this.groupRepo.findOneById(id);
        if (!result) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.GroupNotFound);
        }
        return result;
    }

    private async ensureUsersExist(userIds: string[]) {
        const users = await this.userRepo.findManyByIds(userIds);
        if (users.length !== userIds.length) {
            throw new NotFoundError(ERROR_MESSAGES.NotFound.UserNotFound);
        }
        return users;
    }

    private ensureAdminUsers(users: UserDto[]) {
        if (users.some(user => user.roleName !== Role.Admin)) {
            throw new BadRequestError(ERROR_MESSAGES.BadRequest.UsersMustBeAdmin);
        }
    }
}