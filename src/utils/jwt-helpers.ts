import { JwtPayload } from "jsonwebtoken";

export function getJwtPayloadExpAsDate(exp: number) {
    return new Date(exp * 1000);
}