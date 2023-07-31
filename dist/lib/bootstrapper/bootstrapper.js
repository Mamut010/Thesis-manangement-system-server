"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const bootstrap_setting_1 = require("./bootstrap-setting");
/**
 * Trigger bootstrapping process using the provided configuration.
 * @param config The bootstrapping configuration.
 * @returns The promise returning the settings at the end of the process.
 */
async function bootstrap(config) {
    const bootstrappers = config.bootstrappers;
    const settings = new bootstrap_setting_1.BootstrapSetting();
    if (config.externalDeps) {
        for (const key in config.externalDeps) {
            settings.setData(key, config.externalDeps[key]);
        }
    }
    for (const bootstrapper of bootstrappers) {
        await bootstrapper(settings);
    }
    return settings;
}
exports.bootstrap = bootstrap;
//# sourceMappingURL=bootstrapper.js.map