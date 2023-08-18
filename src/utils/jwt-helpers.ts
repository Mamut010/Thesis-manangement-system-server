import { JwtPayload } from "jsonwebtoken";

export function getJwtPayloadExpAsDate(payload: JwtPayload) {
    return new Date((payload.exp ?? 0) * 1000);
}