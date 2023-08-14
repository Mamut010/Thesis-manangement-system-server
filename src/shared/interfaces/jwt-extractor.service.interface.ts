export interface JwtExtractorServiceInterface {
    /**
     * Extract token from a given authorization header. Returns undefined if failed or not found.
     * @param authHeader The authorization header.
     * @returns The extracted token if suceeded, undefined otherwise.
     */
    extract(authHeader: string): Promise<string | undefined> | string | undefined;
}