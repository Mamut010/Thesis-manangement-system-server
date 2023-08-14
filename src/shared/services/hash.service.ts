import { injectable } from "inversify";
import * as bcrypt from 'bcrypt';
import { AUTH_SETTINGS } from "../../core/constants/auth-settings";
import { HashServiceInterface } from "../interfaces";

@injectable()
export class HashService implements HashServiceInterface {
    async hash(data: string | Buffer): Promise<string> {
        const salt = await bcrypt.genSalt(AUTH_SETTINGS.Hash.SaltRounds);
        return await bcrypt.hash(data, salt);
    }

    verifyHash(data: string | Buffer, hashedData: string): Promise<boolean> {
        return bcrypt.compare(data, hashedData);
    }
}