/**
 * @Cre: https://github.com/w3tecch/express-typescript-boilerplate
 */

import { env } from '../env';
import { Logger } from '../lib/logger';
import { ServerType } from '../shared/types/server-types';
import { route } from '../utils/route-helpers';
import { BootstrapSettingInterface } from './bootstrapper';

export function banner(log: Logger, server: ServerType, settings?: BootstrapSettingInterface): void {
    if (env.app.banner) {
        log.info(``);
        log.info(`Your app is ready on ${route(server, true)}`);
        log.info(`To shut it down, press <CTRL> + C at any time.`);
        log.info(``);
        log.info('-------------------------------------------------------');
        log.info(`Environment  : ${env.node}`);
        log.info(`Version      : ${env.app.version}`);
        log.info(``);
        if(env.swagger.enabled) 
            log.info(`API Info        : ${route(server)}${env.swagger.route}`);
        if(settings?.getData('socket-admin-ui'))
            log.info(`Socket Admin UI : ${env.socketAdminUI.url}`);
        if(env.tracer.enabled)
            log.info(`Tracer Dashboard: ${env.tracer.dashboardUrl}`);
        log.info('-------------------------------------------------------');
        log.info('');
    } else {
        log.info(`Application is up and running.`);
    }
}