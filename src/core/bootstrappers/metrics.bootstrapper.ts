import { Application, Request, Response, RequestHandler } from "express";
import { BootstrapSettingInterface, Bootstrapper } from "../../lib/bootstrapper";
import { BOOTSTRAP_SETTINGS_KEY } from "../../settings/bootstrap-settings";
import { env } from "../../env";
import { Container } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../constants/injection-tokens";
import { register } from "prom-client";
import { makeBasicAuthOrPassThrough } from "../../utils/bootstrapper-helpers";
import express_prom_bundle from "express-prom-bundle";

export const bootstrapMetrics: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const app = settings?.getData<Application>(BOOTSTRAP_SETTINGS_KEY.ExpressApp);
    if (!env.metrics.enabled || !app) {
        return;
    }

    const container = settings?.getData<Container>(BOOTSTRAP_SETTINGS_KEY.Container);
    const serverName = settings?.getData<string>(BOOTSTRAP_SETTINGS_KEY.ServerName);
    const customLabels = serverName ? { server: serverName } : undefined;

    // Custom metrics handler: produce prisma metrics along with app metrics
    const metricsHandler = async (_req: Request, res: Response) => {
        const prisma = container?.isBound(INJECTION_TOKENS.Prisma)
            ? await container.getAsync<PrismaClient>(INJECTION_TOKENS.Prisma)
            : undefined;

        const prismaMetrics = prisma 
            ? await prisma.$metrics.prometheus({ globalLabels: customLabels })
            : '\n';
            
        const appMetrics = await register.metrics();
        res.end(prismaMetrics + appMetrics);
    };

    /**
     * Expose metrics endpoint.
     */
    app.get(
        env.metrics.endpoint,
        makeBasicAuthOrPassThrough(env.metrics.username, env.metrics.password),
        metricsHandler as RequestHandler // Express can handle async handler effectively
    );

    // Add app metrics handler to the container for later use
    container
        ?.bind<RequestHandler>(INJECTION_TOKENS.AppMetricsHandler)
        .toDynamicValue(() => {
            return express_prom_bundle({
                customLabels,
                autoregister: false, // metrics output is processed manually with the above metricsHandler
                includeMethod: true,
                bypass: (req) => req.path === env.metrics.endpoint // Ignore metrics end point
            });
        })
        .inSingletonScope();

    settings?.setData(BOOTSTRAP_SETTINGS_KEY.Metrics, true);
}