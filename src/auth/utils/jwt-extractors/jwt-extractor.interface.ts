import { Request } from 'express';

export interface JwtExtractorInterface {
    /**
     * Extract access token from a request. Returns undefined if failed or not found.
     * @param request The request
     */
    extract(request: Request): Promise<string | undefined> | string | undefined;
}