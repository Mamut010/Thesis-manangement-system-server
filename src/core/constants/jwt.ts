import { ValueOf } from "../../utils/types";

export const JwtTokenType = {
    AccessToken: 'AccessToken',
    RefreshToken: 'RefreshToken',
} as const;

export type JwtTokenType = ValueOf<typeof JwtTokenType>;