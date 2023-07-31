import { injectable } from "inversify";
import { stringEqualsIgnoreCase } from "../../../utils/string-helpers";
import { JwtExtractorInterface } from "./jwt-extractor.interface";
import { Request } from 'express';

@injectable()
export class AuthHeaderJwtExtractor implements JwtExtractorInterface {
    public static readonly TOKEN_PREFIX = 'Bearer';
    public static readonly TOKEN_DELIMITER = ' ';

    extract(request: Request): string | undefined {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return undefined;
        }

        const headerParts = authHeader.split(AuthHeaderJwtExtractor.TOKEN_DELIMITER);
        if (headerParts.length !== 2 || !stringEqualsIgnoreCase(headerParts[0], AuthHeaderJwtExtractor.TOKEN_PREFIX)) {
            return undefined;
        }

        return headerParts[1];
    }
}