import { User } from "../../core/models";
import { UserCreateRequestDto, UserUpdateRequestDto } from "../../shared/dtos";

export interface UserRepoInterface {
    create(request: UserCreateRequestDto): Promise<User>;
    update(request: UserUpdateRequestDto): Promise<User>;
    delete(userId: string): Promise<void>;
}