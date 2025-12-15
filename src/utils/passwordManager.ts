import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function encryptPassword(password: string): Promise<string> {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        throw new Error('Failed to encrypt password');
    }
}

export async function comparePassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Failed to compare password');
    }
}