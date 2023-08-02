import { env } from "../../env";

export const AUTH_SETTINGS = {
    Jwt: {
        AccessTokenSecret: env.secrets.accessToken,
        RefreshTokenSecret: env.secrets.refreshToken,
        RefreshTokenCookie: 'jwt-refresh',
        AccessTokenTtl: '10m',
        RefreshTokenTtl: '30d',
    },
    Hash: {
        SaltRounds: 10,
    },
    Helmet: {
        HstsMaxAge: 31536000
    }
} as const;