"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserChecker = void 0;
const authorized_user_1 = require("./authorized-user");
function currentUserChecker(action) {
    // Here you can use request/response objects from action
    // you need to provide a user object that will be injected in controller actions
    return action.request[authorized_user_1.AUTHORIZED_USER_PROP];
}
exports.currentUserChecker = currentUserChecker;
//# sourceMappingURL=current-user.checker.js.map