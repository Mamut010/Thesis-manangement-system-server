export interface IORoomTimerManagerInterface {
    startRoomTimer(nsp: string, room: string, exp: Date): boolean;
    resetRoomTimer(nsp: string, room: string, newExp?: Date): boolean;
}