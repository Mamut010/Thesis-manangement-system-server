import { inject, injectable } from "inversify";
import { IODefaultServer } from "../../../contracts/types/io";
import { sleepThenCallback } from "../../../utils/timer-helpers";
import { IORoomTimerManagerInterface } from "./io-room-timer-manager.interface";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { RoomData } from "./types";
import { RoomTimerOptions } from "./options";

@injectable()
export class IORoomTimerManager implements IORoomTimerManagerInterface {
    private nspRoomEntriesMap = new Map<string, Map<string, RoomData>>;

    constructor(@inject(INJECTION_TOKENS.IOServer) private io: IODefaultServer) {

    }

    startTimer(nsp: string, room: string, exp: Date, options?: RoomTimerOptions) {
        if (!this.hasRoomInNsp(nsp, room)) {
            return false;
        }

        const roomData = this.getOrCreateRoomData(nsp, room);
        if (roomData.counting && !options?.forceReset) {
            return false;
        }

        return this.start(roomData, exp);
    }

    resetTimer(nsp: string, room: string, newExp?: Date, options?: RoomTimerOptions) {
        const roomData = this.nspRoomEntriesMap.get(nsp)?.get(room);
        if (!roomData) {
            return false;
        }
        
        return newExp 
            ? this.start(roomData, newExp, options) 
            : this.stopIfNeeded(roomData, true);
    }

    clearTimer(nsp: string, room: string) {
        const reset = this.resetTimer(nsp, room);
        if (!reset) {
            return false;
        }

        this.clearRoomData(nsp, room);
        return true;
    }

    pauseTimer(nsp: string, room: string) {
        const roomData = this.nspRoomEntriesMap.get(nsp)?.get(room);
        if (!roomData) {
            return false;
        }

        return this.stopIfNeeded(roomData);
    }

    unpauseTimer(nsp: string, room: string) {
        const roomData = this.nspRoomEntriesMap.get(nsp)?.get(room);
        if (!roomData || roomData.counting || !roomData.exp) {
            return false;
        }

        return this.start(roomData, roomData.exp);
    }

    hasTimer(nsp: string, room: string) {
        return !!this.nspRoomEntriesMap.get(nsp)?.get(room)?.counting;
    }

    getTimerExp(nsp: string, room: string) {
        const roomData = this.nspRoomEntriesMap.get(nsp)?.get(room);
        if (!roomData) {
            return undefined;
        }
        return roomData.exp;
    }

    private hasRoomInNsp(nsp: string, room: string) {
        return !!this.io._nsps.get(nsp)?.adapter.rooms.has(room);
    }

    private getOrCreateRoomData(nsp: string, room: string) {
        let roomEntries = this.nspRoomEntriesMap.get(nsp);
        if (!roomEntries) {
            roomEntries = new Map();
            this.nspRoomEntriesMap.set(nsp, roomEntries);
        }
        let roomData = roomEntries.get(room);
        if (!roomData) {
            roomData = {
                nsp,
                room,
                abortController: new AbortController(),
                counting: false,
            }
            roomEntries.set(room, roomData);
        }
        return roomData;
    }

    private start(roomData: RoomData, newExp: Date, options?: RoomTimerOptions) {
        let isExpCondSatisfied = false;
        if (options?.ignoreSooner) {
            isExpCondSatisfied = roomData.exp ? newExp > roomData.exp : true;
        }
        else {
            isExpCondSatisfied = roomData.exp?.getTime() !== newExp.getTime();
        }

        if (!roomData.counting || isExpCondSatisfied) {
            this.stopIfNeeded(roomData, true);

            roomData.counting = true;
            roomData.exp = newExp;
            const time = newExp.getTime() - Date.now();
    
            sleepThenCallback(time, () => {
                this.io.of(roomData.nsp).in(roomData.room).disconnectSockets();
            },  
            { 
                signal: roomData.abortController.signal
            })
                .then(() => {
                    this.clearRoomData(roomData.nsp, roomData.room);
                })
                .catch((err) => {
                    if (!roomData.oldSignal?.aborted) {
                        throw err;
                    }
                })
                .finally(() => { 
                    roomData.counting = false; 
                });
        }

        return true;
    }

    private stopIfNeeded(roomData: RoomData, dropExp?: boolean) {
        if (!roomData.counting) {
            return false;
        }

        roomData.abortController.abort();
        roomData.oldSignal = roomData.abortController.signal;
        roomData.abortController = new AbortController();
        roomData.counting = false;

        if (dropExp) {
            roomData.exp = undefined;
        }
        return true;
    }

    private clearRoomData(nsp: string, room: string) {
        this.nspRoomEntriesMap.get(nsp)?.delete(room);
    }
}