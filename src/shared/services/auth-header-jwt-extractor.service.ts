import { injectable } from "inversify";
import { stringEqualsIgnoreCase } from "../../utils/string-helpers";
import { JwtExtractorServiceInterface } from "../interfaces/jwt-extractor.service.interface";

@injectable()
export class AuthHeaderJwtExtractorService implements JwtExtractorServiceInterface {
    public static readonly TOKEN_PREFIX = 'Bearer';
    public static readonly TOKEN_DELIMITER = ' ';

    extract(authHeader: string): | string | undefined {
        const headerParts = authHeader.split(AuthHeaderJwtExtractorService.TOKEN_DELIMITER);
        if (headerParts.length !== 2 
            || !stringEqualsIgnoreCase(headerParts[0], AuthHeaderJwtExtractorService.TOKEN_PREFIX)) {
            return undefined;
        }

        return headerParts[1];
    }
}