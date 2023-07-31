import { BootstrapSettingInterface } from "../lib/bootstrapper"

export type Configuration<T> = (target: T, settings?: BootstrapSettingInterface) => void;
export type AsyncConfiguration<T> = (target: T, settings?: BootstrapSettingInterface) => Promise<void>;