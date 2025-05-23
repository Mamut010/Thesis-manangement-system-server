import { IocAdapter } from "routing-controllers";
import { BootstrapSettingInterface, Bootstrapper } from "../../lib/bootstrapper";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { SocketControllers } from "socket-controllers";
import { env } from "../../env";
import { ClassTransformOptions } from 'class-transformer';
import { Container } from "inversify";
import { INJECTION_TOKENS } from "../constants/injection-tokens";
import { IOServer } from "../../contracts/types/io";
import { BOOTSTRAP_SETTINGS_KEY } from "../../settings/bootstrap-settings";

export const bootstrapIo: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const container = settings?.getData<Container>(BOOTSTRAP_SETTINGS_KEY.Container);
    const iocAdapter = settings?.getData<IocAdapter>(BOOTSTRAP_SETTINGS_KEY.IocAdapter);
    const expressServer = settings?.getData<HttpServer>(BOOTSTRAP_SETTINGS_KEY.ExpressServer);

    if (!settings || !container || !iocAdapter || !expressServer) {
        return;
    }

    /**
     * Create and configure io instance
     */
    const io: IOServer = new Server(expressServer, { 
        cors: { 
            origin: env.socketAdminUI.enabled ? [...env.cors.allowOrigins, env.socketAdminUI.url] : env.cors.allowOrigins,
            credentials: env.socketAdminUI.enabled
        } 
    });

    /**
     * Pass io to socket controllers to setup the ws
     */
    const classTransformOptions: ClassTransformOptions = { 
        excludeExtraneousValues: true, 
        exposeUnsetFields: false, 
        exposeDefaultValues: true,
    };

    const socketControllers = new SocketControllers({
        io,
        container: iocAdapter,
        controllers: env.app.servers.ws.dirs.controllers,
        middlewares: env.app.servers.ws.dirs.middlewares,
        transformOption: {
            transform: true,
            parameterTransformOptions: classTransformOptions,
            resultTransformOptions: classTransformOptions,
        }
    });

    // Bind io to container for later dependency injection
    container.bind<IOServer>(INJECTION_TOKENS.IOServer).toConstantValue(io);

    // Set socket/io data for other bootstrappers
    settings.setData(BOOTSTRAP_SETTINGS_KEY.IO, io);
    settings.setData(BOOTSTRAP_SETTINGS_KEY.SocketControllers, socketControllers);
}