"use strict";
/**
 * @Cre: https://github.com/w3tecch/express-typescript-boilerplate
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.banner = void 0;
const env_1 = require("../env");
const route_1 = require("../utils/route");
function banner(log, server) {
    if (env_1.env.app.banner) {
        log.info(``);
        log.info(`Your app is ready on ${(0, route_1.route)(server, true)}`);
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(`Environment  : ${env_1.env.node}`);
        log.info(`Version      : ${env_1.env.app.version}`);
        log.info(``);
        if (env_1.env.swagger.enabled)
            log.info(`API Info     : ${(0, route_1.route)(server)}${env_1.env.swagger.route}`);
        log.info('-------------------------------------------------------');
        log.info('');
    }
    else {
        log.info(`Application is up and running.`);
    }
}
exports.banner = banner;
//# sourceMappingURL=banner.js.map