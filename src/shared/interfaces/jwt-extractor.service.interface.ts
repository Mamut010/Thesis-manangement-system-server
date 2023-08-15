export interface JwtExtractorServiceInterface {
    /**
     * Extract token from a given authorization payload synchronously. Returns undefined if failed or not found.
     * @param payload The authorization payload.
     * @returns The extracted token if suceeded, undefined otherwise.
     */
    extractSync(payload: string): string | undefined;

    /**
     * Extract token from a given authorization payload asynchronously. Returns undefined if failed or not found.
     * @param payload The authorization payload.
     * @returns The promise that when resolved, returns the extracted token if suceeded, undefined otherwise.
     */
    extract(payload: string): Promise<string | undefined>;
}