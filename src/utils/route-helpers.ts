import { env } from "../env";
import { ServerType } from "../shared/types/server-types";

export function route(server: ServerType, withRoutePrefix: boolean = false) {
    const routePrefix = withRoutePrefix ? env.app.servers[server].routePrefix : '';
    return `${env.app.schema}://${resolveHost(env.app.host)}:${env.app.servers[server].port}${routePrefix}`;
}

function resolveHost(host: string) {
    return host === '0.0.0.0' ? 'localhost' : host;
}