import { injectable } from "inversify";
import getUuidByString from "uuid-by-string";
import { SupportedUuidVersion } from "../types/uuid";
import { v4 } from "uuid";

@injectable()
export class UuidService {
    generate(seed?: any, version?: SupportedUuidVersion) {
        if (seed === null || typeof seed === 'undefined') {
            seed = v4();
        }
        return getUuidByString(JSON.stringify(seed), version);
    }
}