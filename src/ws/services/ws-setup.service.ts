import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { UuidServiceInterface } from "../../shared/interfaces";
import { WsSetupServiceInterface } from "../interfaces";
import { IOSocket } from "../../contracts/types/io";

@injectable()
export class WsSetupService implements WsSetupServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.UuidService) private uuidService: UuidServiceInterface) {
        
    }

    async onConnection(socket: IOSocket): Promise<void> {
        // Force all connection from the same user join the same room.
        // This way, every emit to the 'userId' room will be reflected on all tabs if the client opens multiple tabs
        await socket.join(this.getRoom(socket.data.user.userId));
    }

    getRoom(userId: number): string {
        return this.uuidService.generate(userId);
    }
}