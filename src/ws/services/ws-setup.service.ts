import { inject, injectable } from "inversify";
import { INJECTION_TOKENS } from "../../core/constants/injection-tokens";
import { JwtExtractorServiceInterface, JwtServiceInterface } from "../../shared/interfaces";
import { WsSetupServiceInterface } from "../interfaces";
import { WsAuthenticateRequest } from "../../contracts/requests/ws-authenticate.request";
import { WsAuthenticateResponse } from "../../contracts/responses/ws-authenticate.response";
import { IODefaultSocket } from "../../contracts/types/io";
import { IORoomTimerManagerInterface } from "../utils/room-timer";
import { getJwtPayloadExpAsDate } from "../../utils/jwt-helpers";
import { COMMON_MESSAGES } from "../../contracts/constants/common-messages";
import { ERROR_MESSAGES } from "../../contracts/constants/error-messages";
import { RoomIdGeneratorInterface } from "../utils/room-id-generator";

@injectable()
export class WsSetupService implements WsSetupServiceInterface {
    constructor(
        @inject(INJECTION_TOKENS.RoomIdGenerator) private roomIdGenerator: RoomIdGeneratorInterface,
        @inject(INJECTION_TOKENS.IORoomTimerManager) private ioRoomTimerManager: IORoomTimerManagerInterface,
        @inject(INJECTION_TOKENS.JwtExtractor) private jwtExtractor: JwtExtractorServiceInterface,
        @inject(INJECTION_TOKENS.JwtService) private jwtService: JwtServiceInterface) {
        
    }

    async onConnect(socket: IODefaultSocket): Promise<void> {
        // Force all connection from the same user to join the same room.
        // This way, every emit to the 'userId' room will be reflected on all tabs if the user opens multiple tabs
        const nsp = socket.nsp.name;
        const room = this.roomIdGenerator.generate(socket.data.user.userId);
        const exp = getJwtPayloadExpAsDate(socket.data.authPayload.exp);

        await socket.join(room);
        // Start timer for the client room
        this.ioRoomTimerManager.startTimer(nsp, room, exp, { forceReset: true, ignoreSooner: true });
    }

    async onAuthenticate(socket: IODefaultSocket, request: WsAuthenticateRequest): Promise<WsAuthenticateResponse> {
        // Authenticate the token. If failed, also send the error message
        const token = await this.jwtExtractor.extract(request.token);
        if (!token) {
            return { authenticated: false, message: ERROR_MESSAGES.Auth.AccessTokenNotFound };
        }

        try {
            const payload = this.jwtService.verifyAccessToken(token);
            socket.data.user = payload.context;
            socket.data.authPayload = payload;
        }
        catch {
            return { authenticated: false, message: ERROR_MESSAGES.Auth.InvalidAccessToken };
        }

        // If success, reset the timer of the client room
        const newExp = getJwtPayloadExpAsDate(socket.data.authPayload.exp);
        const room = this.roomIdGenerator.generate(socket.data.user.userId);
        this.ioRoomTimerManager.resetTimer(socket.nsp.name, room, newExp);

        return { authenticated: true, message: COMMON_MESSAGES.AuthenticatedSuccessfully };
    }

    onDisconnect(socket: IODefaultSocket): void {
        const nsp = socket.nsp.name;
        const room = this.roomIdGenerator.generate(socket.data.user.userId);
        
        // Clear the timer when a client disconnects (if any)
        this.ioRoomTimerManager.clearTimer(nsp, room);
    }
}