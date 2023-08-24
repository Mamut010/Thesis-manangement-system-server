/**
 * @cre https://github.com/w3tecch/express-typescript-boilerplate
 */

import { configure, format, transports } from 'winston';
import { env } from '../../env';
import { Bootstrapper } from '../../lib/bootstrapper';

export const bootstrapWinston: Bootstrapper = () => {
    configure({
        transports: [
            new transports.Console({
                level: env.log.level,
                handleExceptions: true,
                format: env.node !== 'development'
                    ? format.combine(
                        format.json()
                    )
                    : format.combine(
                        format.colorize(),
                        format.simple()
                    ),
            }),
        ],
    });
}