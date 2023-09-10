import { env } from "../env"
import { NotPromise } from "./types";

export function wrapDecryptionError<T>(fn: () => NotPromise<T>): T | undefined;
export function wrapDecryptionError<T, V>(fn: () => NotPromise<T>, errorCallback: (err: any) => V): T | V | undefined; 
export function wrapDecryptionError<T, V>(fn: () => NotPromise<T>, errorCallback?: (err: any) => V): T | V | undefined {
    try {
        return fn();
    }
    catch(err) {
        if (env.isProduction) {
            if (errorCallback) {
                return errorCallback(err);
            }
            throw err;
        }
    }
}