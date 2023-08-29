import { Action } from 'routing-controllers';
import { AuthorizedUser, AUTHORIZED_USER_PROP } from './authorized-user';
import { getRequestProp } from '../../utils/req-res-helpers';
import { Request } from 'express';
import { CurrentUserChecker } from 'routing-controllers/types/CurrentUserChecker';

export const currentUserChecker: CurrentUserChecker = (action: Action) => {
    // Here you can use request/response objects from action
    // you need to provide a user object that will be injected in controller actions
    const request = action.request as Request;
    return getRequestProp<AuthorizedUser>(request, AUTHORIZED_USER_PROP);
}