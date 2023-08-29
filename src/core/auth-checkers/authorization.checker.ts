import { Request } from 'express';
import { Action } from 'routing-controllers';
import { AuthorizedUser, AUTHORIZED_USER_PROP } from './authorized-user';
import { getRequestProp } from '../../utils/req-res-helpers';
import { AuthorizationChecker } from 'routing-controllers/types/AuthorizationChecker';

export const authorizationChecker: AuthorizationChecker = (action: Action, roles: string[]) => {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    try {
        const request = action.request as Request;
        const user = getRequestProp<AuthorizedUser>(request, AUTHORIZED_USER_PROP);

        if (!user || user.roles.length === 0) {
            return false;
        }

        // Check if the provided roles satify the roles requirement
        return checkRoles(roles, user.roles);
    }
    catch {
        return false;
    }
}

function checkRoles(targetRoles: string[], srcRoles: string[]): boolean {
    return targetRoles.length === 0 || srcRoles.some(role => targetRoles.includes(role));
}