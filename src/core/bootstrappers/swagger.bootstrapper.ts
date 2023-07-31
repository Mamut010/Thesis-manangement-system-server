/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * @see: https://github.com/w3tecch/express-typescript-boilerplate/blob/develop/src/loaders/swaggerLoader.ts
 */

import { getMetadataArgsStorage, RoutingControllersOptions } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import swaggerUi, { JsonObject } from 'swagger-ui-express';
import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { Bootstrapper, BootstrapSettingInterface } from '../../lib/bootstrapper';
import { Application, NextFunction, Request, Response } from 'express';
import basicAuth from 'express-basic-auth';
import { env } from '../../env';
import { MetadataStorage } from 'class-transformer/types/MetadataStorage';

export const bootstrapSwagger: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const expressApp = settings?.getData('express_app') as Application;
    const routingControllersOptions = settings?.getData('routing_controllers_options') as RoutingControllersOptions;

    if (!env.swagger.enabled || !expressApp) {
        return;
    }

    const spec = generateSpec(routingControllersOptions, settings?.getData('server_url') as string);

    expressApp.use(
        env.swagger.route,
        env.swagger.username ? basicAuth({
            users: {
                [`${env.swagger.username}`]: env.swagger.password,
            },
            challenge: true,
        }) : (req: Request, res: Response, next: NextFunction) => next(),
        swaggerUi.serve,
        swaggerUi.setup(spec)
    );
}

function generateSpec(routingControllersOptions?: RoutingControllersOptions, serverUrl?: string): JsonObject {
    // Parse class-validator classes into JSON Schema:
    const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
    const schemas = validationMetadatasToSchemas({
        classTransformerMetadataStorage: defaultMetadataStorage as MetadataStorage,
        refPointerPrefix: '#/components/schemas/'
    });

    // Parse routing-controllers classes into OpenAPI spec:
    const storage = getMetadataArgsStorage();
    const spec = routingControllersToSpec(storage, 
        routingControllersOptions ?? {}, 
        {
            components: { 
                schemas: schemas as any,    
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
        title: env.app.name,
        version: env.app.version,
    };

    spec.servers = [
        {
            url: serverUrl ?? '',
        },
    ];

    return spec;
}