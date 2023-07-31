import { makeImmutable } from "../../utils/object-helpers";

const UNEXPECTED_ERROR_MESSAGES = {
    RefreshTokenCreationFailed: 'Unable to create refresh token',
    RefreshTokenDeleteAllFailed: 'Unable to delete all associated refresh tokens',

    UserCreationFailed: 'Unable to create new user',
};

makeImmutable(UNEXPECTED_ERROR_MESSAGES);

export { UNEXPECTED_ERROR_MESSAGES }