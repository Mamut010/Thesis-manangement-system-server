import { env } from "../env"

export function wrapDecryptionError<T>(fn: () => T): T | undefined;
export function wrapDecryptionError<T, V>(fn: () => T, errorCallback: (err: any) => V): T | V | undefined; 
export function wrapDecryptionError<T, V>(fn: () => T, errorCallback?: (err: any) => V): T | V | undefined {
    try {
        return fn()
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