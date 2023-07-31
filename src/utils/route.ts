import { env } from "../env";
import { ServerType } from "../shared/types/server-types";

export function route(server: ServerType, withRoutePrefix: boolean = false) {
    const routePrefix = withRoutePrefix ? env.app.servers[server].routePrefix : '';
    return `${env.app.schema}://${env.app.host}:${env.app.servers[server].port}${routePrefix}`;
}