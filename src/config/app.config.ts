import { Application } from "express";
import { Configuration } from "./configuration";
import { BootstrapSettingInterface } from "../lib/bootstrapper";

/**
 * Config Express app with all neccessary settings before the initializations of routing-controllers.
 * @param target The Express app.
 * @param settings Bootstrapping process' settings.
 */
export const preconfigApp: Configuration<Application> = (target: Application, settings?: BootstrapSettingInterface) => {
    target.enable('trust proxy');
}

/**
 * Config Express app with all neccessary settings after the initializations of routing-controllers.
 * @param target The Express app.
 * @param settings Bootstrapping process' settings.
 */
export const postconfigApp: Configuration<Application> = (target: Application, settings?: BootstrapSettingInterface) => {
    // DO post configuration works
}