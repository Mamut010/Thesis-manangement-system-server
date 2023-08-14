export interface JwtExtractorServiceInterface {
    /**
     * Extract token from a given authorization payload. Returns undefined if failed or not found.
     * @param payload The authorization payload.
     * @returns The extracted token if suceeded, undefined otherwise.
     */
    extract(payload: string): Promise<string | undefined> | string | undefined;
}