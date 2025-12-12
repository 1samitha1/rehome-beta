import { createUser, findByEmail } from '../repository/userRepository';
import { IUser } from '../models/userModel';

export async function addNewUser(userData: IUser): Promise<IUser> {
    // Check if user already exists
    const existingUser = await findByEmail(userData.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    
    let password = userData.password;
    // hashed password logic can be added here
    
    userData.createdAt = new Date().getTime();

    // Create new user
    const createdUserDoc = await createUser(userData);
    return createdUserDoc.toObject() as IUser;
}