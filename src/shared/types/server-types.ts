import { env } from '../../env';

export type ServerType = Exclude<keyof typeof env.app.servers, 'ws'>;