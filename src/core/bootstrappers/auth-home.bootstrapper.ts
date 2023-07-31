import { Application, Request, Response } from 'express';
import { env } from '../../env';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';

export const bootstrapAuthHome: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const expressApp = settings?.getData('express_app') as Application;
    
    expressApp?.get(
        env.app.servers.auth.routePrefix,
        (req: Request, res: Response) => {
            return res.json({
                name: env.app.name,
                version: env.app.version,
                description: 'This is the home page of Auth Server'
            });
        }
    );
}