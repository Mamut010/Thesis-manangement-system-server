import { inject, injectable } from "inversify";
import { IODefaultServer } from "../../../contracts/types/io";
import { sleepThenCallback } from "../../../utils/timer-helpers";
import { IORoomTimerManagerInterface } from "./io-room-timer-manager.interface";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";

@injectable()
export class IORoomTimerManager implements IORoomTimerManagerInterface {
    private nspRoomEntriesMap = new Map<string, Map<string, RoomData>>;

    constructor(@inject(INJECTION_TOKENS.IOServer) private io: IODefaultServer) {

    }

    startRoomTimer(nsp: string, room: string, exp: Date) {
        if (!this.hasRoomInNsp(nsp, room)) {
            return false;
        }

        const roomData = this.getOrCreateRoomData(nsp, room);
        return this.startTimer(roomData, exp);
    }

    resetRoomTimer(nsp: string, room: string, newExp?: Date) {
        const roomData = this.nspRoomEntriesMap.get(nsp)?.get(room);
        if (!roomData) {
            return false;
        }
        
        return newExp 
            ? this.startTimer(roomData, newExp) 
            : this.stopTimerIfNeeded(roomData);
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
        }
        return roomData;
    }

    private startTimer(roomData: RoomData, newExp: Date) {
        if (roomData.exp?.getTime() !== newExp.getTime()) {
            this.stopTimerIfNeeded(roomData);

            roomData.counting = true;
            const time = newExp.getTime() - Date.now();
    
            sleepThenCallback(time, () => {
                console.log(`Disconnecting all sockets of namespace <${roomData.nsp}> in room <${roomData.room}>`);
                this.io.of(roomData.nsp).in(roomData.room).disconnectSockets();
            },  
            { 
                signal: roomData.abortController.signal
            })
                .finally(() => { 
                    roomData.counting = false; 
                });
        }

        return true;
    }

    private stopTimerIfNeeded(roomData: RoomData) {
        if (!roomData.counting) {
            return false;
        }

        roomData.abortController.abort();
        return true;
    }
}

// Utility type
interface RoomData { 
    nsp: string, 
    room: string,
    exp?: Date,
    abortController: AbortController,
    counting: boolean,
};