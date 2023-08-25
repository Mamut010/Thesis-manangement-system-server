import * as express from 'express';
import express_prom_bundle from 'express-prom-bundle';
import { injectable } from 'inversify';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';
import { env } from '../../env';
import { PassThroughMiddleware } from '../../utils/bootstrapper-helpers';
import { container } from '../../core/bootstrappers';
import { INJECTION_TOKENS } from '../../core/constants/injection-tokens';
import { LazyGetter } from 'lazy-get-decorator';

@Middleware({ type: 'before' })
@injectable()
export class AppMetricsMiddleware implements ExpressMiddlewareInterface {
    @LazyGetter()
    private static get requestHandler(): express.RequestHandler {
        if (env.metrics.enabled) {
            const customLabels = container.isBound(INJECTION_TOKENS.MetricsCustomLabels) 
                ? container.get<Record<string, any>>(INJECTION_TOKENS.MetricsCustomLabels) 
                : undefined;
            return express_prom_bundle({
                customLabels,
                autoregister: false, // Manually process metrics output
                includeMethod: true,
                bypass: (req) => req.path === env.metrics.endpoint // Ignore metrics end point
            }) 
        }
        else {
            return PassThroughMiddleware;
        }
    }

    public use(req: express.Request, res: express.Response, next: express.NextFunction): any {
        return AppMetricsMiddleware.requestHandler(req, res, next);
    }
}