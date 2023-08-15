import { IOSocket } from "../../contracts/types/io";

export interface WsSetupServiceInterface {
    onConnection(socket: IOSocket): Promise<void> | void;
    getRoom(userId: number): string;
}