import { Action } from 'routing-controllers';
import { AuthorizedUser, AUTHORIZED_USER_PROP } from './authorized-user';

export function currentUserChecker(action: Action): Promise<AuthorizedUser | void> | AuthorizedUser | void {
    // Here you can use request/response objects from action
    // you need to provide a user object that will be injected in controller actions
    return (action.request as Record<string, unknown>)[AUTHORIZED_USER_PROP] as AuthorizedUser;
}