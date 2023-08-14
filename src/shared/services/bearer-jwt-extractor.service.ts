import { injectable } from "inversify";
import { stringEqualsIgnoreCase } from "../../utils/string-helpers";
import { JwtExtractorServiceInterface } from "../interfaces/jwt-extractor.service.interface";

@injectable()
export class BearerJwtExtractorService implements JwtExtractorServiceInterface {
    public static readonly TOKEN_PREFIX = 'Bearer';
    public static readonly TOKEN_DELIMITER = ' ';

    extract(payload: string): | string | undefined {
        const headerParts = payload.split(BearerJwtExtractorService.TOKEN_DELIMITER);
        if (headerParts.length !== 2 
            || !stringEqualsIgnoreCase(headerParts[0], BearerJwtExtractorService.TOKEN_PREFIX)) {
            return undefined;
        }

        return headerParts[1];
    }
}