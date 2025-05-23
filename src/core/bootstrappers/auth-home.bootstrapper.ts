import { Application, Request, Response } from 'express';
import { env } from '../../env';
import { BootstrapSettingInterface, Bootstrapper } from '../../lib/bootstrapper';
import { BOOTSTRAP_SETTINGS_KEY } from '../../settings/bootstrap-settings';

export const bootstrapAuthHome: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const expressApp = settings?.getData<Application>(BOOTSTRAP_SETTINGS_KEY.ExpressApp);
    
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