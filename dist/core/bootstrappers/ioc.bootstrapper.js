"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = exports.bootstrapIoc = void 0;
const routing_controllers_1 = require("routing-controllers");
const adapters_1 = require("../../lib/adapters");
const inversify_1 = require("inversify");
const config_1 = require("../../config");
let container;
const bootstrapIoc = (settings) => {
    exports.container = container = new inversify_1.Container();
    const inversifyAdapter = new adapters_1.InversifyAdapter(container);
    (0, routing_controllers_1.useContainer)(inversifyAdapter);
    (0, config_1.configInversify)(container, settings);
};
exports.bootstrapIoc = bootstrapIoc;
//# sourceMappingURL=ioc.bootstrapper.js.map