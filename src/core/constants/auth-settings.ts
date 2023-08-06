import { env } from "../../env";
import { route } from "../../utils/route";

export const AUTH_SETTINGS = {
    Jwt: {
        AccessTokenSecret: env.secrets.accessToken,
        RefreshTokenSecret: env.secrets.refreshToken,
        RefreshTokenCookie: 'thesis-system$refresh',
        AccessTokenTtl: '10m',
        RefreshTokenTtl: '30d',
        DefaultSignOptions: {
            issuer: route('auth'),
            audience: route('api')
        }
    },
    Hash: {
        SaltRounds: 10,
    },
    Helmet: {
        HstsMaxAge: 60 * 60 * 24 * 365 // 1 year
    }
} as const;