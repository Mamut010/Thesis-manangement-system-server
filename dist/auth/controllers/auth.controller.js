"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const http_codes_1 = require("../../core/enums/http-codes");
const injection_tokens_1 = require("../../core/constants/injection-tokens");
const login_request_1 = require("../../contracts/requests/login.request");
const sign_up_request_1 = require("../../contracts/requests/sign-up.request");
const roles_1 = require("../../core/enums/roles");
const string_response_1 = require("../../contracts/responses/string.response");
const string_array_response_1 = require("../../contracts/responses/string-array.response");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(res, loginRequest) {
        return this.authService.login(loginRequest, res);
    }
    signUp(signUpRequest) {
        return this.authService.signUp(signUpRequest);
    }
    roles(req) {
        return this.authService.getRoles(req);
    }
    token(req, res) {
        return this.authService.issueAccessToken(req, res);
    }
    logout(req, res) {
        return this.authService.logout(req, res);
    }
};
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Created),
    (0, routing_controllers_1.Post)('login'),
    (0, routing_controllers_openapi_1.ResponseSchema)(string_response_1.StringResponse),
    tslib_1.__param(0, (0, routing_controllers_1.Res)()),
    tslib_1.__param(1, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, login_request_1.LoginRequest]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(roles_1.Roles.Admin),
    (0, routing_controllers_1.Post)('signup'),
    (0, routing_controllers_1.OnUndefined)(http_codes_1.HttpCodes.Created),
    tslib_1.__param(0, (0, routing_controllers_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [sign_up_request_1.SignUpRequest]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "signUp", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Get)('roles'),
    (0, routing_controllers_openapi_1.ResponseSchema)(string_array_response_1.StringArrayResponse),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "roles", null);
tslib_1.__decorate([
    (0, routing_controllers_1.HttpCode)(http_codes_1.HttpCodes.Ok),
    (0, routing_controllers_1.Post)('token'),
    (0, routing_controllers_openapi_1.ResponseSchema)(string_response_1.StringResponse),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "token", null);
tslib_1.__decorate([
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.Delete)('logout'),
    (0, routing_controllers_1.OnUndefined)(http_codes_1.HttpCodes.NoContent),
    tslib_1.__param(0, (0, routing_controllers_1.Req)()),
    tslib_1.__param(1, (0, routing_controllers_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, routing_controllers_1.JsonController)(),
    (0, inversify_1.injectable)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
        security: [{ bearerAuth: [] }] // Applied to each method
    }),
    tslib_1.__param(0, (0, inversify_1.inject)(injection_tokens_1.INJECTION_TOKENS.AuthService)),
    tslib_1.__metadata("design:paramtypes", [Object])
], AuthController);
//# sourceMappingURL=auth.controller.js.map