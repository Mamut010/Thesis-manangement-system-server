import { JWT_TOKEN_TYPES } from "../../core/constants/jwt-token-types";

const tokenTypes = Object.values(JWT_TOKEN_TYPES);
export type JwtTokenType = typeof tokenTypes[number];