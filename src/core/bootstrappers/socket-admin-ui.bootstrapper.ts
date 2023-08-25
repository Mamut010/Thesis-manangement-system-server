import { instrument } from "@socket.io/admin-ui";
import { env } from "../../env";
import { BootstrapSettingInterface, Bootstrapper } from "../../lib/bootstrapper";
import { hashSync } from "bcrypt";
import { IOServer } from "../../contracts/types/io";
import { BOOTSTRAP_SETTINGS_KEY } from "../../settings/bootstrap-settings";

export const bootstrapSocketAdminUI: Bootstrapper = (settings?: BootstrapSettingInterface) => {
    const io = settings?.getData<IOServer>(BOOTSTRAP_SETTINGS_KEY.IO);
    if (!env.socketAdminUI.enabled || !io) {
        return;
    }

    instrument(io, {
        mode: env.isDevelopment ? 'development' : 'production',
        namespaceName: env.socketAdminUI.nsp ? env.socketAdminUI.nsp : undefined,
        auth: env.socketAdminUI.username ? {
            type: 'basic',
            username: env.socketAdminUI.username,
            password: hashSync(env.socketAdminUI.password, 10)
        } : false
    });

    settings?.setData(BOOTSTRAP_SETTINGS_KEY.SocketAdminUI, true);
}