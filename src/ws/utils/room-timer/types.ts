export interface RoomData { 
    nsp: string, 
    room: string,
    exp?: Date,
    abortController: AbortController,
    counting: boolean,
}