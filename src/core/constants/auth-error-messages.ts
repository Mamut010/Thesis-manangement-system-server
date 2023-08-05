export const AUTH_ERROR_MESSAGES = {
    InvalidLoginCredentials: 'Wrong username or password',
    InvalidEmbeddedCredentials: 'Invalid embedded credentials',
    InvalidRefreshToken: 'Invalid refresh token',
    InvalidAccessToken: 'Invalid access token',

    UserIdAlreadyExists: 'User ID already exists',
    UsernameAlreadyExists: 'Username already exists', 

    RefreshTokenNotFound: 'Refresh token not found',
} as const;