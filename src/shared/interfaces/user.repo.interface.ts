import { User } from "../../core/models";
import { UserCreateRequestDto } from "../dtos/user-create-request.dto";

export interface UserRepoInterface {
    create(request: UserCreateRequestDto): Promise<User>;
}