export interface HashServiceInterface {
    hash(data: string | Buffer): Promise<string>;
    verifyHash(data: string | Buffer, hashedData: string): Promise<boolean>;
}