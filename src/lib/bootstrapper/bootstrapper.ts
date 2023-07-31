import { BootstrapSetting } from "./bootstrap-setting";
import { BootstrapSettingInterface } from "./bootstrap-setting.interface";

export type Bootstrapper = (settings?: BootstrapSettingInterface) => Promise<void | undefined> | void | undefined;

export interface BootstrapConfig {
    /**
     * Array of bootstrappers to trigger in sequential order.
     */
    bootstrappers: Bootstrapper[],

    /**
     * External dependencies to add into settings before bootstrapping process.
     */
    externalDeps?: Record<any, unknown>
}

/**
 * Trigger bootstrapping process using the provided configuration.
 * @param config The bootstrapping configuration.
 * @returns The promise returning the settings at the end of the process.
 */
export async function bootstrap(config: BootstrapConfig): Promise<BootstrapSettingInterface> {
    const bootstrappers = config.bootstrappers;
    const settings = new BootstrapSetting();

    if (config.externalDeps) {
        for (const key in config.externalDeps) {
            settings.setData(key, config.externalDeps[key]);
        }
    }

    for (const bootstrapper of bootstrappers) {
        await bootstrapper(settings);
    }

    return settings;
}