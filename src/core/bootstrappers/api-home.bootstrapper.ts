import { Application, Request, Response } from 'express';
import { env } from '../../env';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { BOOTSTRAP_SETTINGS_KEY } from '../constants/bootstrap-settings';

export const bootstrapApiHome: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const expressApp = settings?.getData<Application>(BOOTSTRAP_SETTINGS_KEY.ExpressApp);
    
    expressApp?.get(
        env.app.servers.api.routePrefix,
        (req: Request, res: Response) => {
            return res.json({
                name: env.app.name,
                version: env.app.version,
                description: 'This is the home page of API Server'
            });
        }
    );
}