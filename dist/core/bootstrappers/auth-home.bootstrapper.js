"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapAuthHome = void 0;
const env_1 = require("../../env");
const bootstrapAuthHome = (settings) => {
    const expressApp = settings?.getData('express_app');
    expressApp?.get(env_1.env.app.servers.auth.routePrefix, (req, res) => {
        return res.json({
            name: env_1.env.app.name,
            version: env_1.env.app.version,
            description: 'This is the home page of Auth Server'
        });
    });
};
exports.bootstrapAuthHome = bootstrapAuthHome;
//# sourceMappingURL=auth-home.bootstrapper.js.map