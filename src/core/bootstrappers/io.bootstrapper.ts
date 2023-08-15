import { IocAdapter } from "routing-controllers";
import { BootstrapSettingInterface, Bootstrapper } from "../../lib/bootstrapper";
import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { SocketControllers } from "socket-controllers";
import { env } from "../../env";
import { ClassTransformOptions } from 'class-transformer';
import { CORS_OPTIONS } from "../constants/cors-options";
import { Container } from "inversify";
import { INJECTION_TOKENS } from "../constants/injection-tokens";
import { IOServer } from "../../contracts/types/io";

export const bootstrapIo: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const container = settings?.getData('container') as Container | undefined;
    const iocAdapter = settings?.getData('ioc-adapter') as IocAdapter | undefined
    const expressServer = settings?.getData('express_server') as HttpServer | undefined;

    if (!settings || !container || !iocAdapter || !expressServer) {
        return;
    }

    /**
     * Create and configure io instance
     */
    const io: IOServer = new Server(expressServer, { cors: CORS_OPTIONS });

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
    settings.setData('io', io);
    settings.setData('socket-controllers', socketControllers);
}