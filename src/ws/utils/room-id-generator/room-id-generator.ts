import { inject, injectable } from "inversify";
import { UuidServiceInterface } from "../../../shared/interfaces";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { RoomIdGeneratorInterface } from "./room-id-generator.interface";

@injectable()
export class RoomIdGenerator implements RoomIdGeneratorInterface {
    constructor(@inject(INJECTION_TOKENS.UuidService) private uuidService: UuidServiceInterface) {

    }

    generate(userId: number): string {
        return this.uuidService.generate(userId);
    }
}