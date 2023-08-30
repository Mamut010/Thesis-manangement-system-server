import * as bcrypt from 'bcrypt';

export function hash(toHash: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(toHash, salt);
}