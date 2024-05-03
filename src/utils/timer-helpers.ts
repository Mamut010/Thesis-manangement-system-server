import { TimerOptions } from 'timers';
import { setTimeout } from 'timers/promises';

export function sleepThenValue<T>(ms: number, value: T, options?: TimerOptions): Promise<T> {
    return setTimeout(ms, value, options);
}

export async function sleep(ms: number, options?: TimerOptions): Promise<void> {
    await sleepThenValue(ms, undefined, options);
}

export async function sleepThenCallback<T>(ms: number, callback: () => Promise<T> | T, options?: TimerOptions)
    : Promise<T> {
    await sleep(ms, options);
    return await callback();
}