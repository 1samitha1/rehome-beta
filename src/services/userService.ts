import { createUser, findByEmail } from '../repository/userRepository';
import { IUser } from '../models/userModel';
import { encryptPassword } from '../utils/passwordManager';

export async function addNewUser(userData: IUser): Promise<IUser> {
    // Check if user already exists
    const existingUser = await findByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    let hashedPassword = await encryptPassword(userData.password);

    userData.password = hashedPassword;
    userData.createdAt = new Date().getTime();

    // Create new user
    const createdUserDoc = await createUser(userData);
    return createdUserDoc.toObject() as IUser;
}