import { Application, Request, Response, NextFunction, RequestHandler } from "express";
import { Configuration } from "./configuration";
import { BootstrapSettingInterface } from "../lib/bootstrapper";
import { BOOTSTRAP_SETTINGS_KEY } from "../settings/bootstrap-settings";
import { env } from "../env";
import { Container } from "inversify";
import { PrismaClient } from "@prisma/client";
import { MetricsOptions } from "@prisma/client/runtime/library";
import expressBasicAuth from "express-basic-auth";
import { INJECTION_TOKENS } from "../core/constants/injection-tokens";
import express_prom_bundle from "express-prom-bundle";
import { register } from "prom-client";

/**
 * Config Express app with all neccessary settings before the initializations of routing-controllers.
 * @param target The Express app.
 * @param settings Bootstrapping process' settings.
 */
export const preconfigApp: Configuration<Application> = (target: Application, settings?: BootstrapSettingInterface) => {
    target.enable('trust proxy');
    configMetrics(target, settings);
}

/**
 * Config Express app with all neccessary settings after the initializations of routing-controllers.
 * @param target The Express app.
 * @param settings Bootstrapping process' settings.
 */
export const postconfigApp: Configuration<Application> = (target: Application, settings?: BootstrapSettingInterface) => {
    // DO post configuration works
}

function configMetrics(app: Application, settings?: BootstrapSettingInterface) {
    const container = settings?.getData<Container>(BOOTSTRAP_SETTINGS_KEY.Container);
    const prisma = container?.get<PrismaClient>(INJECTION_TOKENS.Prisma);

    if (!env.metrics.enabled || !app || !prisma) {
        return;
    }

    const serverName = settings?.getData<string>(BOOTSTRAP_SETTINGS_KEY.ServerName);
    const customLabels = serverName ? { server: serverName } : undefined;
    const metricOptions: MetricsOptions | undefined = !customLabels ? customLabels : 
        {
            globalLabels: customLabels
        };

    /**
     * Expose metrics endpoint before anything else.
     * This way, the metrics for this route is ignore
     */
    app.get(
        env.metrics.endpoint,
        (env.metrics.username && env.metrics.password) ? expressBasicAuth({
            users: {
                [`${env.metrics.username}`]: env.metrics.password,
            },
            challenge: true,
        }) : (_req: Request, _res: Response, next: NextFunction) => next(),
        (async (_req: Request, res: Response) => {
            const prismaMetrics = await prisma.$metrics.prometheus(metricOptions);
            const appMetrics = await register.metrics();
            res.end(prismaMetrics + appMetrics);
        }) as RequestHandler
    );

    // Setup metrics middleware
    const metricsMiddleware = express_prom_bundle({ 
        customLabels,
        autoregister: false, // Manually concat express-prom-bundle metrics with prisma metrics
        includeMethod: true,
    });
    app.use(metricsMiddleware);

    settings?.setData(BOOTSTRAP_SETTINGS_KEY.Metrics, true);
}