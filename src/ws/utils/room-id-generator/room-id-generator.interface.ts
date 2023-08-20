export interface RoomIdGeneratorInterface {
    /**
     * Generate a unique room ID for any given user ID. Two identical input IDs will produce the same ouput.
     * @param userId The user ID.
     */
    generate(userId: unknown): string;
}