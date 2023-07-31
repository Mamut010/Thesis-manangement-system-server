"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrapSwagger = void 0;
const tslib_1 = require("tslib");
/**
 * @see: https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/loaders/swaggerLoader.ts
 */
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const express_basic_auth_1 = tslib_1.__importDefault(require("express-basic-auth"));
const env_1 = require("../../env");
const bootstrapSwagger = (settings) => {
    const expressApp = settings?.getData('express_app');
    const routingControllersOptions = settings?.getData('routing_controllers_options');
    if (!env_1.env.swagger.enabled || !expressApp) {
        return;
    }
    const spec = generateSpec(routingControllersOptions, settings?.getData('server_url'));
    expressApp.use(env_1.env.swagger.route, env_1.env.swagger.username ? (0, express_basic_auth_1.default)({
        users: {
            [`${env_1.env.swagger.username}`]: env_1.env.swagger.password,
        },
        challenge: true,
    }) : (req, res, next) => next(), swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(spec));
};
exports.bootstrapSwagger = bootstrapSwagger;
function generateSpec(routingControllersOptions, serverUrl) {
    // Parse class-validator classes into JSON Schema:
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
    const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
        classTransformerMetadataStorage: defaultMetadataStorage,
        refPointerPrefix: '#/components/schemas/'
    });
    // Parse routing-controllers classes into OpenAPI spec:
    const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
    const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, routingControllersOptions ?? {}, {
        components: {
            schemas: schemas,
            securitySchemes: {
                bearerAuth: {
                    scheme: 'bearer',
                    type: 'http',
                    bearerFormat: 'JWT'
                }
            },
        }
    });
    // Add npm infos to the swagger doc
    spec.info = {
        title: env_1.env.app.name,
        version: env_1.env.app.version,
    };
    spec.servers = [
        {
            url: serverUrl ?? '',
        },
    ];
    return spec;
}
//# sourceMappingURL=swagger.bootstrapper.js.map