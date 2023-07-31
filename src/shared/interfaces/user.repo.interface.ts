import { User } from "../../core/models";
import { UserCreatingRequestDto } from "../dtos/user-creating-request.dto";

export interface UserRepoInterface {
    create(request: UserCreatingRequestDto): Promise<User>;
}