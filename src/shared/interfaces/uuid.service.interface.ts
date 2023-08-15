import { SupportedUuidVersion } from "../types/uuid";

export interface UuidServiceInterface {
    generate(seed?: any, version?: SupportedUuidVersion): string;
}