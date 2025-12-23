import { createUser, findByEmail, findByUserName, userLogin } from '../repository/user.repository';
import { IUser } from '../models/user.model';
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

export async function login(loginData: IUser): Promise<IUser> {
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
        throw new Error('Invalid password');
        
    }

    // user login
    const loggedUser = await userLogin(loginData);
    return loggedUser.toObject() as IUser;
}