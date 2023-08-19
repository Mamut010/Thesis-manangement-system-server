import { RoomTimerOptions } from "./options";

export interface IORoomTimerManagerInterface {
    startTimer(nsp: string, room: string, exp: Date, options?: RoomTimerOptions): boolean;
    resetTimer(nsp: string, room: string, newExp?: Date, options?: RoomTimerOptions): boolean;
    clearTimer(nsp: string, room: string): boolean;
    pauseTimer(nsp: string, room: string): boolean;
    unpauseTimer(nsp: string, room: string): boolean;
    hasTimer(nsp: string, room: string): boolean;
    getTimerExp(nsp: string, room: string): Date | undefined;
}