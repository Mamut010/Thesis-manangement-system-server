/**
 * @cre luke-park
 * @see https://github.com/luke-park/SecureCompatibleEncryptionExamples/blob/master/JavaScript/SCEE-Node.js#L40
 */

import { injectable } from "inversify";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { AUTH_SETTINGS } from "../../core/constants/auth-settings";
import { CryptoServiceInterface } from "../interfaces";

@injectable()
export class CryptoService implements CryptoServiceInterface {
    async hash(data: string | Buffer): Promise<string> {
        const salt = await bcrypt.genSalt(AUTH_SETTINGS.Hash.SaltRounds);
        return await bcrypt.hash(data, salt);
    }

    hashSync(data: string | Buffer): string {
        const salt = bcrypt.genSaltSync(AUTH_SETTINGS.Hash.SaltRounds);
        return bcrypt.hashSync(data, salt);
    }

    verifyHash(data: string | Buffer, hashedData: string): Promise<boolean> {
        return bcrypt.compare(data, hashedData);
    }

    verifyHashSync(data: string | Buffer, hashedData: string): boolean {
        return bcrypt.compareSync(data, hashedData);
    }

    encrypt(plaintext: string): Buffer {
        // Generate a 96-bit nonce using a CSPRNG.
        const nonce = crypto.randomBytes(AUTH_SETTINGS.Cipher.AlgorithmNonceSize);
    
        // Create the cipher instance.
        const cipher = crypto.createCipheriv(AUTH_SETTINGS.Cipher.AlgorithmName, AUTH_SETTINGS.Cipher.AlgorithmKey, nonce);
    
        // Encrypt and prepend nonce.
        const ciphertext = Buffer.concat([ cipher.update(plaintext), cipher.final() ]);
    
        return Buffer.concat([ nonce, ciphertext, cipher.getAuthTag() ]);
    }
    
    encryptAsString(plaintext: string): string {
        return this.encrypt(plaintext).toString('base64');
    }
    
    decrypt(ciphertextAndNonce: Buffer | string): Buffer {
        if (typeof ciphertextAndNonce === 'string') {
            ciphertextAndNonce = Buffer.from(ciphertextAndNonce, 'base64');
        }
    
        // Create buffers of nonce, ciphertext and tag.
        const nonce = ciphertextAndNonce.subarray(0, AUTH_SETTINGS.Cipher.AlgorithmNonceSize);
        const ciphertext = ciphertextAndNonce.subarray(AUTH_SETTINGS.Cipher.AlgorithmNonceSize, 
            ciphertextAndNonce.length - AUTH_SETTINGS.Cipher.AlgorithmTagSize);
        const tag = ciphertextAndNonce.subarray(ciphertext.length + AUTH_SETTINGS.Cipher.AlgorithmNonceSize);
    
        // Create the cipher instance.
        const cipher = crypto.createDecipheriv(AUTH_SETTINGS.Cipher.AlgorithmName, AUTH_SETTINGS.Cipher.AlgorithmKey, nonce);
    
        // Decrypt and return result.
        cipher.setAuthTag(tag);
        return Buffer.concat([ cipher.update(ciphertext), cipher.final() ]);
    }
    
    decryptAsString(ciphertextAndNonce: Buffer | string): string {
        return this.decrypt(ciphertextAndNonce).toString();
    }
}