import { Request } from 'express';
import { Action } from 'routing-controllers';
import { container } from '../bootstrappers';
import { INJECTION_TOKENS } from '../constants/injection-tokens';
import { AuthServiceInterface } from '../../auth/interfaces';
import { JwtAccessContextDto } from '../../shared/dtos';
import { AuthorizedUser, AUTHORIZED_USER_PROP } from './authorized-user';

export async function authorizationChecker(action: Action, roles: string[]): Promise<boolean> {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    try {
        const authService: AuthServiceInterface = container.get(INJECTION_TOKENS.AuthService);
        const request = action.request as Request;
        const payload = await authService.verifyJwtTokenInRequest(request);
        const context = payload?.context;

        if (!context || context.roles.length === 0) {
            return false;
        }

        // Check if the provided roles satify the roles requirement
        const isRolesRequirementSatisfied = checkRoles(roles, context.roles);

        // Add authorized user to request if satisfied
        if (isRolesRequirementSatisfied) {
            addAuthorizedUserToRequest(request, context)
        }

        return isRolesRequirementSatisfied;
    }
    catch {
        return false;
    }
}

function checkRoles(targetRoles: string[], srcRoles: string[]): boolean {
    return targetRoles.length === 0 || srcRoles.some(role => targetRoles.includes(role));
}

function addAuthorizedUserToRequest(request: Request, context: JwtAccessContextDto) {
    // Add jwt context as the authorized user to the request
    const authorizedUser: AuthorizedUser = context;
    (request as Record<string, any>)[AUTHORIZED_USER_PROP] = authorizedUser;
}