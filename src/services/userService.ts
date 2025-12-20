import { createUser, findByEmail, findByUserName } from '../repository/userRepository';
import { IUser } from '../models/userModel';
import { encryptPassword, comparePassword } from '../utils/passwordManager';

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

export async function userLogin(loginData: IUser): Promise<IUser> {
    // Check if user exists
    const existingUser = await findByUserName(loginData.userName);
    if (!existingUser || existingUser === null) {
        return ({success: false, message: 'User does not exists'} as unknown) as IUser;
        //throw new Error('User does not exists');
    }

    const isValidPassword = await comparePassword(
        loginData.password,
        existingUser.get('password')
    );
    
    if (!isValidPassword) {
        
    }

    // user login
    const loggedUser = await userLogin(loginData);
    return loggedUser;
}