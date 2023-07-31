"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationChecker = void 0;
const bootstrappers_1 = require("../bootstrappers");
const injection_tokens_1 = require("../constants/injection-tokens");
const authorized_user_1 = require("./authorized-user");
async function authorizationChecker(action, roles) {
    // here you can use request/response objects from action
    // also if decorator defines roles it needs to access the action
    // you can use them to provide granular access check
    // checker must return either boolean (true or false)
    // either promise that resolves a boolean value
    try {
        const authService = bootstrappers_1.container.get(injection_tokens_1.INJECTION_TOKENS.AuthService);
        const request = action.request;
        const payload = await authService.verifyJwtTokenInRequest(request);
        const context = payload?.context;
        if (!context || context.roles.length === 0) {
            return false;
        }
        // Check if the provided roles satify the roles requirement
        const isRolesRequirementSatisfied = checkRoles(roles, context.roles);
        // Add authorized user to request if satisfied
        if (isRolesRequirementSatisfied) {
            addAuthorizedUserToRequest(request, context);
        }
        return isRolesRequirementSatisfied;
    }
    catch {
        return false;
    }
}
exports.authorizationChecker = authorizationChecker;
function checkRoles(targetRoles, srcRoles) {
    return targetRoles.length === 0 || srcRoles.some(role => targetRoles.includes(role));
}
function addAuthorizedUserToRequest(request, context) {
    // Add jwt context as the authorized user to the request
    const authorizedUser = context;
    request[authorized_user_1.AUTHORIZED_USER_PROP] = authorizedUser;
}
//# sourceMappingURL=authorization.checker.js.map