import { makeImmutable } from "../../utils/object-helpers";

const AUTH_ERROR_MESSAGES = {
    InvalidLoginCredentials: 'Wrong username or password',
    InvalidEmbeddedCredentials: 'Invalid embedded credentials',
    InvalidRefreshToken: 'Invalid refresh token',
    InvalidAccessToken: 'Invalid access token',

    UserIdAlreadyExists: 'User ID already exists',
    UsernamAlreadyExists: 'Username already exists', 

    RefreshTokenNotFound: 'Refresh token not found',
};

makeImmutable(AUTH_ERROR_MESSAGES);

export { AUTH_ERROR_MESSAGES }