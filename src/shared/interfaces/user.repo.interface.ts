import { User } from "../../core/models";
import { UserCreateRequestDto, UserUpdateRequestDto } from "../dtos";

export interface UserRepoInterface {
    create(request: UserCreateRequestDto): Promise<User>;
    update(request: UserUpdateRequestDto): Promise<User>;
    delete(userId: number): Promise<void>;
}