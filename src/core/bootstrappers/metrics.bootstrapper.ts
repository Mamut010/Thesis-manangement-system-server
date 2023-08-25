import { Application, Request, Response, RequestHandler } from "express";
import { BootstrapSettingInterface, Bootstrapper } from "../../lib/bootstrapper";
import { BOOTSTRAP_SETTINGS_KEY } from "../../settings/bootstrap-settings";
import { env } from "../../env";
import { Container } from "inversify";
import { PrismaClient } from "@prisma/client";
import { INJECTION_TOKENS } from "../constants/injection-tokens";
import { register } from "prom-client";
import { makeBasicAuthOrPassThrough } from "../../utils/bootstrapper-helpers";

export const bootstrapMetrics: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const app = settings?.getData<Application>(BOOTSTRAP_SETTINGS_KEY.ExpressApp);
    if (!env.metrics.enabled || !app) {
        return;
    }

    const container = settings?.getData<Container>(BOOTSTRAP_SETTINGS_KEY.Container);
    const serverName = settings?.getData<string>(BOOTSTRAP_SETTINGS_KEY.ServerName);
    const prisma = container?.get<PrismaClient>(INJECTION_TOKENS.Prisma);
    const customLabels = serverName ? { server: serverName } : undefined;

    /**
     * Expose metrics endpoint.
     */
    const metricsHandler = async (_req: Request, res: Response) => {
        const prismaMetrics = prisma ? (await prisma.$metrics.prometheus({ globalLabels: customLabels })) : '\n';
        const appMetrics = await register.metrics();
        res.end(prismaMetrics + appMetrics);
    };

    app.get(
        env.metrics.endpoint,
        makeBasicAuthOrPassThrough(env.metrics.username, env.metrics.password),
        metricsHandler as RequestHandler // Express can handle async handler effectively
    );

    if (container && customLabels) {
        container.bind<Record<string, any>>(INJECTION_TOKENS.MetricsCustomLabels).toConstantValue(customLabels);
    }

    settings?.setData(BOOTSTRAP_SETTINGS_KEY.Metrics, true);
}