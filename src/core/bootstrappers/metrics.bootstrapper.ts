/**
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/metrics
 */
import { Application, Request, Response, NextFunction, RequestHandler } from "express";
import { BootstrapSettingInterface, Bootstrapper } from "../../lib/bootstrapper";
import { BOOTSTRAP_SETTINGS_KEY } from "../../settings/bootstrap-settings";
import { env } from "../../env";
import { Container } from "inversify";
import { INJECTION_TOKENS } from "../constants/injection-tokens";
import basicAuth from 'express-basic-auth';
import { PrismaClient } from "@prisma/client";
import { MetricsOptions } from "@prisma/client/runtime/library";
import { register } from "prom-client";

export const bootstrapMetrics: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const app = settings?.getData<Application>(BOOTSTRAP_SETTINGS_KEY.ExpressApp);
    const container = settings?.getData<Container>(BOOTSTRAP_SETTINGS_KEY.Container);
    const prisma = container?.get<PrismaClient>(INJECTION_TOKENS.Prisma);

    if (!env.metrics.enabled || !app || !prisma) {
        return;
    }

    const serverName = settings?.getData<string>(BOOTSTRAP_SETTINGS_KEY.ServerName);
    const metricOptions: MetricsOptions | undefined = !serverName ? undefined : 
        {
            globalLabels: { server: serverName }
        };

    app.get(
        env.metrics.endpoint,
        (env.metrics.username && env.metrics.password) ? basicAuth({
            users: {
                [`${env.metrics.username}`]: env.metrics.password,
            },
            challenge: true,
        }) : (_req: Request, _res: Response, next: NextFunction) => next(),
        (async (_req, res: Response) => {
            const prismaMetrics = await prisma.$metrics.prometheus(metricOptions)
            const appMetrics = await register.metrics()
            res.end(prismaMetrics + appMetrics);
        }) as RequestHandler
    );

    settings?.setData(BOOTSTRAP_SETTINGS_KEY.Metrics, true);
}