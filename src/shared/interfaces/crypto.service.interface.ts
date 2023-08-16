export interface CryptoServiceInterface {
    hash(data: string | Buffer): Promise<string>;
    hashSync(data: string | Buffer): string;
    verifyHash(data: string | Buffer, hashedData: string): Promise<boolean>;
    verifyHashSync(data: string | Buffer, hashedData: string): boolean;
    encrypt(plaintext: string): Buffer;
    encryptAsString(plaintext: string): string;
    decrypt(ciphertextAndNonce: Buffer | string): Buffer;
    decryptAsString(ciphertextAndNonce: Buffer | string): string;
}