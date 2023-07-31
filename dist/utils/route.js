"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const env_1 = require("../env");
function route(server, withRoutePrefix = false) {
    const routePrefix = withRoutePrefix ? env_1.env.app.servers[server].routePrefix : '';
    return `${env_1.env.app.schema}://${env_1.env.app.host}:${env_1.env.app.servers[server].port}${routePrefix}`;
}
exports.route = route;
//# sourceMappingURL=route.js.map