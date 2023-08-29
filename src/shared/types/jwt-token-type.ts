import { JWT_TOKEN_TYPES } from "../../core/constants/jwt";
export type JwtTokenType = (typeof JWT_TOKEN_TYPES)[keyof typeof JWT_TOKEN_TYPES];