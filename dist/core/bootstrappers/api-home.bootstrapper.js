"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapApiHome = void 0;
const env_1 = require("../../env");
const bootstrapApiHome = (settings) => {
    const expressApp = settings?.getData('express_app');
    expressApp?.get(env_1.env.app.servers.api.routePrefix, (req, res) => {
        return res.json({
            name: env_1.env.app.name,
            version: env_1.env.app.version,
            description: 'This is the home page of API Server'
        });
    });
};
exports.bootstrapApiHome = bootstrapApiHome;
//# sourceMappingURL=api-home.bootstrapper.js.map