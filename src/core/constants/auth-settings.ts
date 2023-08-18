import { env } from "../../env";
import { route } from "../../utils/route-helpers";

export const AUTH_SETTINGS = {
    Jwt: {
        AccessTokenSecret: env.auth.accessToken,
        RefreshTokenSecret: env.auth.refreshToken,
        AccessTokenTtl: '30s',
        RefreshTokenTtl: '30d',
        DefaultSignOptions: {
            issuer: route('auth'),
            audience: route('api')
        }
    },
    Cookie: {
        Secret: env.auth.cookieSecret,
        RefreshTokenKey: 'thesis-system$refresh',
    },
    Hash: {
        SaltRounds: 10,
    },
    Cipher: {
        AlgorithmKey: env.auth.cipherSecret,
        AlgorithmName: 'aes-128-gcm',
        AlgorithmNonceSize: 12,
        AlgorithmTagSize: 16,
    },
    Helmet: {
        HstsMaxAge: 60 * 60 * 24 * 365 // 1 year
    }
} as const;