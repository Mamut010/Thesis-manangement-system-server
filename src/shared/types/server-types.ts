import { env } from '../../env';

export type ServerType = keyof typeof env.app.servers;