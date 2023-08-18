import { Abortable } from 'events';
import { setTimeout } from 'timers/promises';

export async function sleep(ms: number, options?: Abortable): Promise<void> {
    await setTimeout(ms, undefined, options);
}

export async function sleepThenValue<T>(ms: number, value: T, options?: Abortable): Promise<T> {
    return setTimeout(ms, value, options);
}

export async function sleepThenCallback<T>(ms: number, callback: () => Promise<T> | T, options?: Abortable)
    : Promise<T | undefined> {
    await setTimeout(ms, undefined, options);
    if (!options?.signal?.aborted) {
        return await callback();
    }
}